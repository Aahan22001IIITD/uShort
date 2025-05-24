const {nanoid} = require('nanoid');
const Url = require('../models/url_schema');


async function handleCreate(req , res)
{
    const requestbody = req.body;
    if(!requestbody.url)
    {
        return res.status(400).json({error:"url is required"});
    }
    const shortid = nanoid(5);
    await Url.create({
        
    })
}

