const mongoose=require("mongoose")

async function connectdb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database is connected")
}
module.exports=connectdb