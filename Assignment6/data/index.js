const redis = require('redis');
const Promise = require("bluebird");
const client = Promise.promisifyAll(redis.createClient());
const axios = require('axios');

const loadJson = async () =>  {
    /*reset hash*/
    const hash = (await client.hkeysAsync("UserList"));
    for(let i = 0; i<hash.length; ++i){
        await client.hdelAsync("UserList",hash[i]);
    }
    
    const response = (await axios.get("https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json")).data;
    for(let i = 0; i<response.length; ++i){

        await client.hsetAsync("UserList",JSON.stringify(response[i].id),JSON.stringify(response[i]));

    }
    max = response.length+2;
};

const GET = async(id)=>{
    const obj = await client.hgetAsync("UserList",id);
    if(obj==null){
        return {
            status:'404',
            message:'Person not found'
        }
    }
    return {
        status:'200',
        data: JSON.parse(obj)
    }
};

const DELETE = async(id)=>{
    const result = await client.hdelAsync("UserList",id);
    if(result==0){
        return {
            status:'404',
            message:'Person requested for deletion does not exist'
        }
    }
    return {
        status:'200',
        message:'Deletion Successful'
    }
};
// const PUT = async(id,obj)=>{

// }
const POST = async(obj)=>{
    if(obj===undefined ||obj.first_name===undefined||obj.last_name===undefined||obj.email===undefined||obj.gender===undefined||obj.ip_address===undefined){
        return {
            status:'400',
            message:'Not all fields were provided, a JSON object with first_name, last_name, email, gender, and ip_address is needed'
        }
    }
    
    const key = max;
    ++max;
    obj.id = key;
    await client.hsetAsync("UserList",JSON.stringify(key),JSON.stringify(obj));
    obj = await client.hgetAsync("UserList",JSON.stringify(key));
    return {
        status:'200',
        data:JSON.parse(obj)
    }

}

module.exports = {
    loadJson,
    GET,
    DELETE,
    POST
}