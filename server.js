const app=require('./src/app')
const connectdb=require('./src/dataDb/db')
connectdb()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})