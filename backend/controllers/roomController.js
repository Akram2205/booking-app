const Room = require('../models/Room');
const Hotel = require('../models/Hotel')

const getAllRooms =async (req,res,next)=>{
    try{
        let rooms = await Room.find({});
        if(!rooms) return res.status(404).send('there are no rooms');
        res.status(200).json(rooms); 
    }catch(err){
        next(err)
    }
}

const getRoom =async (req,res,next)=>{
    try{
        let room =await Room.findById(req.params.id);
        if(!room) return res.status(404).send('not found');
        res.status(200).json(room);
    }catch(err){
        next(err)
    }

}
const addRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId;
    let newRoom = new Room(req.body)
    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}});
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        for(let e in err.errors){
            console.log(err.errors[e].message)
        }
        res.send(err)
    }
}

const updateRoomAvailability =async (req,res,next)=>{
    try{
        await Room.updateOne({"roomNumber._id" : req.params.id},{
            $push:{
                "roomNumber.$.unavailableDate": req.body.dates
            }
        })
        res.status(200).send('room updated dates');
    }catch(err){
        next(err)
    }
}

const updateRoom =async (req,res,next)=>{
    try{
        let updatedRoom =await Room.findByIdAndUpdate(req.params.id,req.body,{
            returnOriginal: false
        });
        if(!updatedRoom) return res.status(404).send('not found');
        res.status(200).send('room updated'+updatedRoom);
    }catch(err){
        next(err)
    }
}

const deleteRoom = async(req,res,next)=>{
    let hotelId = req.params.hotelId;
    try{
        let deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if(!deletedRoom) return res.status(404).send('not found');
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull: {rooms: req.params.id}})
        }catch(err){
            next(err)
        }
        res.status(200).send('room deleted'+deletedRoom);
    }catch(err){
        next(err)
    }
}



module.exports = {getAllRooms,getRoom,addRoom,updateRoom,deleteRoom,updateRoomAvailability}