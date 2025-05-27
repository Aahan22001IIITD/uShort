// this handles the url creation page
const URL = require('../models/url_schema');

async function url_creation_page(req,res){
    const urls = await URL.find({});
    res.render('create_url',{urls,userAccessToken:process.env.USER_ACCESS_TOKEN});
}
module.exports={url_creation_page};
