const mongoose = require('mongoose');
// we will create a map in for each userid and the session id for that user 
const authSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    session_id: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;