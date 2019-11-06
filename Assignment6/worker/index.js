const Promise = require('bluebird');
const redisConnection = Promise.promisifyAll(require('../redis-connection'));
const messageHandlers = require('../data');



(async()=>{
    await messageHandlers.loadJson();
    redisConnection.on('GET', async (obj, channel) => {
        const result = await messageHandlers.GET(obj.id)
        redisConnection.emit('GET-Response',result);
      });
    redisConnection.on('POST',async(obj,channel)=>{
        redisConnection.emit('POST-Response',await messageHandlers.POST(obj));
    });
    // redisConnection.on('PUT',(obj,channel)=>{
    //     redisConnection.emit('PUT-Response',{});
    // });
    redisConnection.on('DELETE', async (obj,channel)=>{
        redisConnection.emit('DELETE-Response',(await messageHandlers.DELETE(obj.id)));
    });
})();



