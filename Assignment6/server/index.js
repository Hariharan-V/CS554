var express = require('express');
const Promise = require('bluebird');
var app = express();
const redisConnection = (require('../redis-connection'));
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/api/people/:id',async (req,res)=>{
    let sub = null;
    sub = redisConnection.on('GET-Response',async (obj, channel)=>{
        sub();
        if(obj.status==='404'){
            res.status('404').json({error:obj.message});
            return;
        }
        res.json(obj.data);
        
    }) 
    redisConnection.emit('GET',{id:req.params.id});
});
 app.post('/api/people/', async(req,res)=>{
     
    let sub = null; 
    sub = redisConnection.on('POST-Response',async(obj,channel)=>{
        sub();
        if(obj.status==='400'){
            res.status('400').json(obj);
            return;
        }
        res.json(obj.data);
    })
    redisConnection.emit('POST',req.body);
 });
// app.put('/api/people/:id',async(req,res)=>{
    
// });
app.delete('/api/people/:id',async(req,res)=>{
    let sub = null;
    sub = redisConnection.on('DELETE-Response',async (obj, channel)=>{
        sub();
        if(obj.status==='404'){
            res.status('404').json(obj);
            return;
        }
        res.json(obj);
       
    }) 
    redisConnection.emit('DELETE',{id:req.params.id});
});
app.use('*', async (req,res)=>{
    res.status(404).json({error:"Not Found"});
});
app.listen(3000, function(){
    console.log('server is up and running on port 3000');
})