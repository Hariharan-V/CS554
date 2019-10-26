var express = require('express');
var app = express();
var routes = require('./routes');

routes(app);
app.use("*",(req,res)=>{
    res.status(404).json({error:"Not Found"});
});
app.listen(3000, function(){
    console.log('server is up and running on port 3000');
})