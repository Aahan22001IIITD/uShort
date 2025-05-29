const {nanoid} = require('nanoid');
const Url = require('../models/url_schema');
const {getUserSession} = require('../services/auth');
async function handleCreate(req , res)
{
    const requestbody = req.body;
    const token = req.cookies.token;
    const user_id = await getUserSession(token);
    if(!requestbody.url)
    {
        return res.status(400).json({error:"url is required"});
    }
    const checkurl = await Url.findOne({original_url:requestbody.url});
    if(checkurl)
    {
        return res.json({
            "original_url":checkurl.original_url,
            "short_id":checkurl.short_id,
            "timestamps":checkurl.timestamps,
            "message":"NOTE: This url short id already exists"
        });
    }
    const shortid = nanoid(5);
    await Url.create({
        "original_url":requestbody.url,
        "short_id":shortid,
        "timestamps":[],
        "user_id":user_id
    });
    
    return res.json({
        "original_url":requestbody.url,
        "short_id":shortid,
        "timestamps":[]
    });
    console.log("url created successfully , and sent to the client!");
}

module.exports = {
    handleCreate
}


