const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    adress:{
        type: String,
        required: true
    },
    distance:{
        type: String,
        required: true
    },
    photos:{
        type:[String],
    },
    desc:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    rating:{ 
        type: Number,
        min: 0,
        max: 5,
    },
    note:{
        type: String,
        required: true,
    },
    rooms:{
        type: [String]
    },
    cheapestPrice:{
        type: Number,
        required: true,
    },
    featured:{
        type: Boolean,
        default: false
    }

});

const Hotel = mongoose.model('hotel',hotelSchema)

module.exports = Hotel;