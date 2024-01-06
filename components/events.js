const Mongoose = require('mongoose')
const {Schema, model} = Mongoose

const eventSchema=new Schema({
    artist: String,
    genre: String,
    location: String,
    date: String,
    time: String,
    eventPicture: File
    
})



const Event = model('Events', eventSchema)