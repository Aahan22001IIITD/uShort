// this handles the url creation page
const URL = require('../models/url_schema');
const { getUserSession } = require('../services/auth');

async function url_creation_page(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/user/login');
        }

        const user_id = await getUserSession(token);
        const urls = await URL.find({ user_id: user_id }).sort({ createdAt: -1 });
        
        res.render('create_url', {
            urls: urls,
            user_id: user_id,
            userAccessToken: token
        });
    } catch (error) {
        console.error('Error in url_creation_page:', error);
        res.redirect('/user/login');
    }
}

module.exports = { url_creation_page };
