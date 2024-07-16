const mongoose = require('mongoose');


const roomSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true,
    },
    desc:{
        type: String,
    },
    roomNumber:[{number: Number , unavailableDate:[{type: Date}] }]
});

const Room = mongoose.model('rooms',roomSchema)

module.exports = Room;