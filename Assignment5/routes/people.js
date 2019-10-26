const express = require("express");
const router = express.Router();
const search = require("../data");
const redis = require('redis');
const Promise = require("bluebird");
const client = Promise.promisifyAll(redis.createClient());
router.get("/history",async(req,res)=>{
    
    const list = await client.lrangeAsync("user",0,19);

    res.status(200).json(list.map(x=>JSON.parse(x)));
});
router.get("/:id",async(req,res)=>{
    const list = await client.lrangeAsync("user",0,-1);
    const id = req.params.id;
    let obj = null;
    for (let i = 0; i<list.length;++i){
        const element = JSON.parse(list[i]);
       if(element.id==id){
            await client.lpushAsync("user",[JSON.stringify(element)]);
           res.status(200).json(element);
           return;
       } 
    }
    
    obj  = await search.getById(id);
    if(obj!=null){
        await client.lpushAsync("user",[JSON.stringify(obj)]);
        res.status(200).json(obj);
        return;
    }
    res.status(404).json({error:"ID Not Found"});
});


module.exports = router;
