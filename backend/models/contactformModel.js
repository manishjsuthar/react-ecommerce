const mongoose = require('mongoose')


const contactformSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("ContactForm", contactformSchema)