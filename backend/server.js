const express = require('express')
const cors=require('cors');
const mongoose=require('mongoose');
const router=express.Router();
require('dotenv').config()

const app=express();
const port=process.env.port || 5000;
app.use(cors());
app.use(express.json());
const uri="mongodb+srv://maroofazeem:saleemi123@cluster0.yjp1b.mongodb.net/AsliDoctor?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})

const connection=mongoose.connection


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
connection.once('open',()=>{
    console.log("MongoDB connected successfully");
})

app.get('/sample',(req,res)=>{
    connection.db.collection('sample',(err,collection)=>{
    console.log(req.query)
    collection.find({
                    Name:eval(req.query.name),
                    "Father Name":eval(req.query.fathersName),
                    City:eval(req.query.city),
                    reg:eval(req.query.registration),
                    type:eval(req.query.type),
                    Gender:eval(req.query.gender)
    }).toArray((err,results)=>{res.send(JSON.stringify(results))});
    })
    
});

