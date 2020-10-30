const mongoose = require("mongoose")

const pbSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    }
}, {collection: 'pb'});

module.exports = mongoose.model('pb', pbSchema)