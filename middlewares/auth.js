const jwt = require('jsonwebtoken');
async function allowtologgedInUsers(req , res , next){
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/user/login');
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
}
module.exports = {allowtologgedInUsers};
