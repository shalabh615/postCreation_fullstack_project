require("dotenv").config();
const express= require('express');
const multer=require('multer');
const uploadfile=require('./services/storage.services')
const postmodel=require('./models/post.model')
const cors =require ('cors')
const app=express();

app.use(express.json());
app.use(cors())
const upload=multer({storage: multer.memoryStorage() })
app.post('/create-post',upload.single("image") ,async(req,res)=>{
    
    const result = await uploadfile(req.file.buffer) 

    const post=await postmodel.create({
        image:result.url,
        caption:req.body.caption
    })
    return res.status(201).json({
       message:"post created",
       post
    })
})
app.get('/posts',async(req,res)=>{
    const posts= await postmodel.find()

    return res.status(201).json({
        message:"post fetched ",
        posts
    })
})



module.exports=app;