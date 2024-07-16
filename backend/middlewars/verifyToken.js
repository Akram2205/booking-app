const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).send('token exist');

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err) return res.status(403).send('token is not valid');
        if(payload.userId == req.params.id || payload.isAdmin ){
            next()
        }else{
            res.status(401).send('you are not autherized');
        }
    });

}


const verifyAdmin = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(501).send('token not exist');

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err) return res.status(403).send('token is not valid');
        if(payload.isAdmin ){
            next()
        }else{
            res.status(401).send('you are not autherized');
        }
    });

}

module.exports = {verifyUser,verifyAdmin}