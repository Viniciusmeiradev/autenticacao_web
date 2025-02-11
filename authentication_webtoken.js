var jwt = require('jsonwebtoken');
const db = require('../models/index');
module.exports = ansync(req, res, next) => {
    try{
        //Tratamento para o token
        if (req.headers.authorization) {
            var token = req.headers.authorization.split("")[1];
            var decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded){
                var user = await db.users.findOne({where:{id:decoded.id}})
                if (user){
                    req.user = user;
                    next();

                }else{
                    res.json({
                        status:'false',
                        message:"Invalid token!",
                        userStatus:'false'
                })
            }else{
                res.status(422).json({
                    status:'false',
                    message:"Invalid token!",
                    userStatus:'false'
            })
        }else{
            res.status(422).json({
                status:'false',
                message:"Invalid token!",
                userStatus:'false'
        })
        catch(error){
            res.status(500).json({
                status:'false',
                message:error.message,
                userStatus:'false'
            })
        }
    }
}