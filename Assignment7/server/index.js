var express = require('express');
const Promise = require('bluebird');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = io.of('/chat');
const redisConnection = (require('../redis-connection'));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const nrpSender = require('./nrp-sender-shim');
app.use(express.static('public'));


chat.on('connection',async (socket)=>{

    socket.on('query&message',async (obj)=>{
        try{
            chat.emit('chat_message',{
                URL: await nrpSender.sendMessage({
                    redis: redisConnection,
                    eventName: 'pictures',
                    data:{
                        query: obj.query
                    }
                }),
                user: obj.user,
                message: obj.message
            });
            socket.emit('query&message',{operation:"success"}); 
    }catch(e){
        socket.emit('query&message',{operation:"failure", message:e.message}); 
    }

    });
  
});

http.listen(3000,()=>{
    // console.log(chat);
    console.log("listening on port 3000");
});

