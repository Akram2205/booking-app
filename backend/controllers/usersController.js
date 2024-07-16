const User = require('../models/Users');



const getAllUsers =async (req,res,next)=>{
    try{
        let users = await User.find({});
        if(!users) return res.status(404).send('there are no users');
        res.status(200).json(users); 
    }catch(err){
        next(err)
    }
}

const getUser =async (req,res,next)=>{
    try{
        let user =await User.findById(req.params.id);
        if(!user) return res.status(404).send('not found');
        res.status(200).json(user);
    }catch(err){
        next(err)
    }

}

const updateUser =async (req,res,next)=>{
    try{
        let updatedUser =await User.findByIdAndUpdate(req.params.id,req.body,{
            returnOriginal: false
        });
        if(!updatedUser) return res.status(404).send('not found');
        res.status(200).send('user updated'+updatedUser);
    }catch(err){
        next(err)
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        let deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).send('not found');
        res.status(200).send('user deleted'+deletedUser);
    }catch(err){
        next(err)
    }
}


module.exports = {getAllUsers,getUser,updateUser,deleteUser}


