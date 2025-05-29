const User = require('../models/users');
const { setUserSession , getUserSession} = require('../services/auth');
async function signupUser(req , res){
    console.log(req.body);
    const {username , password , name , phone  , email} = req.body;
    if(!User.validate({username , password , name , phone  , email})){
        return res.status(400).json({error : User.error});
    }
    const user = await User.create({username , password , name , phone  , email});
    const token = await setUserSession(user._id);
    res.cookie('token' , token);
    return res.status(200).json({success : true , user : user._id});
}
async function loginUser(req , res){
    const {username  , password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({error : "User Not Found"});
    }
    if(user.password !== password){
        return res.status(400).json({error : "Invalid Password"});
    }
    const token = await setUserSession(user._id);
    res.cookie('token' , token);
    return res.status(200).json({status : true , user : user._id});
}
module.exports = {
    signupUser , loginUser}