const mongoose = require('mongoose')

const enquireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    }
})

const Enquire = mongoose.model('Enquire', enquireSchema)

module.exports = Enquire;