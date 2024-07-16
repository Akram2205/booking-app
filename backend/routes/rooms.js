const express = require('express');
const router = express.Router();

const {verifyAdmin }= require('../middlewars/verifyToken') ;

const roomController = require('../controllers/roomController');

router.get('/',roomController.getAllRooms);

router.get('/:id',roomController.getRoom);

router.post('/:hotelId',verifyAdmin, roomController.addRoom);

router.put('/:id',verifyAdmin, roomController.updateRoom);

router.put('/availability/:id', roomController.updateRoomAvailability);

router.delete('/:hotelId/:id',verifyAdmin,roomController.deleteRoom);

module.exports = router