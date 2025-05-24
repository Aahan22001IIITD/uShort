const Url = require('../models/url_schema');
async function handleRedirect(req , res){
    const params = req.params;
    if(!params.shortid)
    {
        return res.status(400).json({error:"error in the redirect controller , shortid is required"});
    }
    const shortid = params.shortid;
    const url = await Url.findOne({short_id:shortid});
    if(!url)
    {
        return res.status(400).json({error:"This shortid was not created by us. Please check the shortid and try again."});
    }
    url.timestamps.push(Date.now());
    await url.save();
    return res.redirect(url.original_url);
    
}


module.exports={handleRedirect}