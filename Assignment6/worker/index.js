const Promise = require('bluebird');
const redisConnection = Promise.promisifyAll(require('../redis-connection'));
const messageHandlers = require('../data');



(async()=>{
    await messageHandlers.loadJson();
    redisConnection.on('GET:request:*', async (message, channel) => {

        const result = await messageHandlers.GET(message.data.id)
        let requestId = message.requestId;
        let eventName = message.eventName;
        let successEvent = `${eventName}:success:${requestId}`;
        let failEvent = `${eventName}:failed:${requestId}`;
        if(result.status=='200'){
          redisConnection.emit(successEvent, {
            requestId: requestId,
            data: result.data,
            eventName: eventName
          });
        }else{
          redisConnection.emit(failEvent, {
            requestId: requestId,
            data: result,
            eventName: eventName
          });
        }
      });
    redisConnection.on('POST:request:*',async(message,channel)=>{
        const result = await messageHandlers.POST(message.data)
        // console.log("result:"+result);
        let requestId = message.requestId;
        let eventName = message.eventName;
        let successEvent = `${eventName}:success:${requestId}`;
        let failEvent = `${eventName}:failed:${requestId}`;
        // console.log(result);
        if(result.status=='200'){
          redisConnection.emit(successEvent, {
            requestId: requestId,
            data: result.data,
            eventName: eventName
          });
        }else{
          redisConnection.emit(failEvent, {
            requestId: requestId,
            data: result,
            eventName: eventName
          });
        }
    });
    redisConnection.on('DELETE:request:*', async (message,channel)=>{
        const result = await messageHandlers.DELETE(message.data.id);
        let requestId = message.requestId;
        let eventName = message.eventName;
        let successEvent = `${eventName}:success:${requestId}`;
        let failEvent = `${eventName}:failed:${requestId}`;
        if(result.status=='200'){
          redisConnection.emit(successEvent, {
            requestId: requestId,
            data: result,
            eventName: eventName
          });
        }else{
          redisConnection.emit(failEvent, {
            requestId: requestId,
            data: result,
            eventName: eventName
          });
        }

    });
    redisConnection.on('PUT:request:*', async (message,channel)=>{
      const result = await messageHandlers.PUT(message.data.id,message.data.body);
      let requestId = message.requestId;
      let eventName = message.eventName;
      let successEvent = `${eventName}:success:${requestId}`;
      let failEvent = `${eventName}:failed:${requestId}`;
      if(result.status=='200'){
        redisConnection.emit(successEvent, {
          requestId: requestId,
          data: result.data,
          eventName: eventName
        });
      }else{
        redisConnection.emit(failEvent, {
          requestId: requestId,
          data: result,
          eventName: eventName
        });
      }

  });

})();



