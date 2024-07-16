const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async(req,res,next)=>{
    try{
        let user =await Users.findOne({email: req.body.email});
        if(user) return res.status(400).send('this email is registred');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        user = new Users({
            username:req.body.username,
            email: req.body.email,
            password: hashPassword,
            country: req.body.country,
            phone: req.body.phone,
            img: req.body.img
        });

        await user.save();
    
        const token = jwt.sign({userId: user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET);
        res.cookie('access_token',token,{
            httpOnly: true,
        })
        
        res.status(200).send(user);
    }catch(err){ 
        next(err)
    }
}

const login = async(req,res,next)=>{
        try{
            let user = await Users.findOne({email: req.body.email});
            if(!user) return res.status(400).send('user not found');
        
            let valid = await bcrypt.compare(req.body.password,user.password);
            if(!valid) return res.status(400).send('wrong password');
        
            const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
            res.cookie("access_token",token,{
                httpOnly: true
            })
            res.status(200).send(user)
            
        }catch(err){
            next(err)
        }
};





module.exports = {register,login}