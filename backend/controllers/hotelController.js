const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

const getAllHotels =async (req,res,next)=>{
    const {min,max,limit,...others} = req.query;
    try{
        let hotels = await Hotel.find({...others,
            cheapestPrice :{$gt:min || 1,$lt:max || 999}
        }).limit(req.query.limit);
        if(!hotels) return res.status(404).send('there are no hotels');
        res.status(200).json(hotels); 
    }catch(err){
        next(err)
    }
}

const getHotel =async (req,res,next)=>{
    try{
        let hotel =await Hotel.findById(req.params.id);
        if(!hotel) return res.status(404).send('not found');
        res.status(200).json(hotel);
    }catch(err){
        next(err)
    }

}
const addHotel = async(req,res,next)=>{
    try{
        let newHotel = new Hotel(req.body);
        await newHotel.save();
        res.status(200).send('add a new hotel'+newHotel)
    }catch(err){
        next(err)
    }
}
const updateHotel =async (req,res,next)=>{
    try{
        let updatedHotel =await Hotel.findByIdAndUpdate(req.params.id,req.body,{
            returnOriginal: false
        });
        if(!updatedHotel) return res.status(404).send('not found');
        res.status(200).send('hotel updated'+updatedHotel);
    }catch(err){
        next(err)
    }
}

const deleteHotel = async(req,res,next)=>{
    try{
        let deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if(!deletedHotel) return res.status(404).send('not found');
        res.status(200).send('hotel deleted'+deletedHotel);
    }catch(err){
        next(err)
    }
}

const countByCity = async(req,res,next) =>{
    try{
        list =req.query.cities.split(',')

        numbers = await Promise.all(list.map((city)=>{
            return Hotel.countDocuments({city:city})
        }))
        res.send(numbers)
    }catch(err){
        next(err)
    }
}

const countByType = async(req,res,next) =>{
    try{
        const hotelCount = await Hotel.countDocuments({type:'hotel'})
        const appartementCount = await Hotel.countDocuments({type:'appartement'})
        const villaCount = await Hotel.countDocuments({type:'villa'})
        const cabinCount = await Hotel.countDocuments({type:'cabin'})

        res.send([
            {type:'hotel', count: hotelCount},
            {type:'appartement', count: appartementCount},
            {type:'villa', count: villaCount},
            {type:'cabin', count: cabinCount},
        ])
    }catch(err){
        next(err)
    }
}

const getHotelRooms =async (req,res,next) =>{
    try{
        let hotel =await Hotel.findById(req.params.id)
        let list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).send(list)
    }catch(err){
        next(err)
    }
}

module.exports = {getAllHotels,getHotel,addHotel,updateHotel,deleteHotel,countByCity,countByType,getHotelRooms}