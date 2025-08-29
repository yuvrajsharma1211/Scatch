const mongoose=require('mongoose');


const dbgr= require("debug")("development:mongoose")

mongoose.connect(`${process.env.MONGODB_URI}/scatch`)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    dbgr("Error", err);
})

module.exports= mongoose.connection;