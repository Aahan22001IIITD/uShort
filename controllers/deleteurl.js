const Url = require('../models/url_schema');

async function handleDelete(req,res){
    const body=req.body;
    if(!body.shortid)
    {
        return res.status(400).json({error:"shortid is required"});
    }
    const shortid = body.shortid;
    const url = await Url.findOne({short_id:shortid});
    if(!url)
    {
        return res.status(400).json({error:"shortid not found"});
    }
    await Url.deleteOne({short_id:shortid});
    return res.json({message:"url deleted successfully"});
    
}
module.exports={handleDelete};