const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    short_id:{
        type:String,
        required:true,
        unique:true,
    },
    original_url:{
        type:String,
        
    },
    // an array to store the time stamps of the url
    timestamps:[{
        type:Date,
        default:Date.now,
    }],
})

module.exports = mongoose.model('Url', urlSchema);
