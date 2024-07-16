const express = require('express');
const router = express.Router();

const {verifyAdmin }= require('../middlewars/verifyToken') ;

const hotelController = require('../controllers/hotelController');

router.get('/',hotelController.getAllHotels);

router.get('/:id',hotelController.getHotel);

router.post('/',verifyAdmin, hotelController.addHotel);

router.put('/:id',verifyAdmin, hotelController.updateHotel);

router.delete('/:id',verifyAdmin,hotelController.deleteHotel);

router.get('/count/countByCity',hotelController.countByCity);

router.get('/count/countByType',hotelController.countByType);

router.get('/room/:id', hotelController.getHotelRooms)

module.exports = router