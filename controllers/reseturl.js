const URL = require('../models/url_schema');

async function handleReset(req,res){
    await URL.deleteMany({});
    res.json({message:"All urls deleted"});
}
module.exports={handleReset};