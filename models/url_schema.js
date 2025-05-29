const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    short_id:{
        type:String,
        required:true,
        unique:true,
    },
    original_url:{
        type:String,
        required:true,
    },
    // an array to store the time stamps of the url
    timestamps:[{
        type:Date,
        default:Date.now,
    }],
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
})

module.exports = mongoose.model('Url', urlSchema);
