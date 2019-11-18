const axios = require('axios');
const URL =(search_term) =>`https://pixabay.com/api/?key=14296539-4a338880b0fb42295996b8e1c&q=${search_term.trim().split(' ').reduce((acc,n)=>acc+"+"+n)}&image_type=photo&pretty=true`;
const Promise = require('bluebird');
const redisConnection = Promise.promisifyAll(require('../redis-connection'));

const getRelevantInfo = (obj)=>{
    let list = [];
    obj.hits.forEach(element => {
        list.push(
            
             element.largeImageURL

            
        );
    });
    return list;
};


redisConnection.on('pictures:request:*',async(message,_)=>{
    let requestId = message.requestId;
    let eventName = message.eventName;
    let successEvent = `${eventName}:success:${requestId}`;
    let failEvent = `${eventName}:failed:${requestId}`;
    let list = null;
    try{
        let obj = (await axios.get(URL(message.data.query))).data;
        // console.l0og(obj);
        list = getRelevantInfo(obj);
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: list,
            eventName: eventName
          });
         
        //   console.log(list);
    }catch(e){
        // console.log(e);
        
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: [],
            eventName: eventName
          });
    }
})


