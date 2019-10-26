const data = require("./lab5.json");
const getById=(id)=>{
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const result = getFromData(id);
            if(result!=null){
                resolve(result);
            }else{
                reject(new Error("not found"));
            }
        },5000);
        
    })
};
const getFromData = (id)=>{
    for(let i = 0; i<data.length; ++i){
        if(data[i].id==id){
            return data[i];
        }
    }
    return null;
};

module.exports = {
    getById
}