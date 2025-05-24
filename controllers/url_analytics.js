// this file handles the logic of analytics of a url 
const Url = require('../models/url_schema');
// aquire the url schema , and use that schema to get the analytics 
// anayltics - > numbeer of clicks and timestamps 


async function handleAnalytics(req , res){
    // handle the analytics of a url 
    const body = req.body;
    if(!body.shortid)
    {
        return res.status(400).json({error:"error in the analytics controller , shortid is required"});
    }
    const shortid = body.shortid;
    const url = await Url.findOne({short_id:shortid});
    if(!url)
    {
        return res.status(400).json({error:"This shortid was not created by us. Please check the shortid and try again."});
    }
    return res.json({
        "clicks":url.timestamps.length,
        "timestamps":url.timestamps
    });
}
module.exports={handleAnalytics};