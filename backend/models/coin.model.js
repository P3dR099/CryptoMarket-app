const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coinSchema = new Schema({

    change: {
        type: Number,
        default: 0,
        required: true
    },
    id: {
        type: Number,
        default: 0,
        required: true
    },
    marketCap: {
        type: Number,
        default: 0,
        required: true
    },
    name: {
        type: String,
        default: 0,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    symbol: {
        type: String,
        default: 0,
        required: true
    }
}, {
    timestamps: true
})

const Coin = mongoose.model('Coin', coinSchema)
module.exports = Coin