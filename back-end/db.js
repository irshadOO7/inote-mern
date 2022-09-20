const mongoose =  require('mongoose');

const mongooseUri = "mongodb://localhost:27017/inote?directConnection=true";

const mongooseToConnect =()=>{
    mongoose.connect(mongooseUri, ()=>{
        console.log("connected to mongoose");
    })
}
module.exports = mongooseToConnect;