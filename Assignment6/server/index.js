var express = require('express');
const Promise = require('bluebird');
var app = express();
const redisConnection = (require('../redis-connection'));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const nrpSender = require('./nrp-sender-shim');
app.get('/api/people/:id',async (req,res)=>{
    try{
        let obj = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'GET',
            data:{
                id:req.params.id
            }
        });

        res.json(obj);
        return;
    }catch(e){
        res.status(e.status).json({error:e.message});
        return;
    }
    

});
 app.post('/api/people/', async(req,res)=>{
    try{
        let obj = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'POST',
            data:req.body
        });

        res.json(obj);
        return;
    }catch(e){
        res.status(e.status).json({error:e.message});
        return;
    }
 });
app.put('/api/people/:id',async(req,res)=>{
    console.log(req.body);
    try{
        let obj = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'PUT',
            data:{body: req.body, id: req.params.id}
        });

        res.json(obj);
        return;
    }catch(e){
        res.status(e.status).json({error:e.message});
        return;
    }
});
app.delete('/api/people/:id',async(req,res)=>{
    try{
        let obj = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: 'DELETE',
            data:{id:req.params.id}
        });

        res.json(obj);
        return;
    }catch(e){
        res.status(e.status).json({error:e.message});
        return;
    }


});
app.use('*', async (req,res)=>{
    res.status(404).json({error:"Not Found"});
});
app.listen(3000, function(){
    console.log('server is up and running on port 3000');
})