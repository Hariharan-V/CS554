const people = require('./people');
const index = app=>{
    app.use("/api/people",people);
    app.use("*",(req,res)=>{
        res.status(404).json({error:"Not Found"});
    });
}
module.exports = index;