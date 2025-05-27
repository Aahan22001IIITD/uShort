const express = require('express');
const router = express.Router();
const {handleCreate} = require('../controllers/urlcreater');
const {handleAnalytics} = require('../controllers/url_analytics');
const {handleRedirect} = require('../controllers/redirectLogic');
const {handleDelete} = require('../controllers/deleteurl.js');
const {url_creation_page} = require('../controllers/url_creation_page.js');
const {handleReset} = require('../controllers/reseturl.js');
const dotenv = require('dotenv');
dotenv.config();
function checkUserToken(req, res, next) {
    const token = req.headers['user-access-token'];
    if (!token) {
        return res.status(401).json({ error: "User access token is required" });
    }
    if(token !== process.env.USER_ACCESS_TOKEN)
    {
        return res.status(401).json({ error: "Invalid user access token" });
    }
    // Here you can add additional logic to validate the token if needed
    next();
}

router.use('/api/url', checkUserToken);

router.post('/api/url',handleCreate);
router.post('/api/url/:shortid/analytics',handleAnalytics);
router.get('/short/:shortid',handleRedirect);
router.post('/api/url/delete',handleDelete);
router.post('/api/url/reset',handleReset);
router.get('/create_url'  , url_creation_page )
router.get('/',(req,res)=>{
    res.render('home');
});
module.exports = router;