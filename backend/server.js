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
    console.log("Requesting Doctors...");
    connection.db.collection('sample',(err,collection)=>{
    // console.log(req.query)
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
app.post('/message',(req,res)=>{
    
    console.log(req.body);
    if (req.body.email!=undefined){
    connection.db.collection('messages',(err,collection)=>{
        
        collection.save(req.body).then(()=>res.send("Uploaded")).catch(err=>res.send("Error: "+err));
    })
    }


});


app.post('/report',(req,res)=>{
    
    console.log(req.body);
    if (req.body.email!=undefined){
    connection.db.collection('report',(err,collection)=>{
        
        collection.save(req.body).then(()=>res.send("Uploaded")).catch(err=>res.send("Error: "+err));
    })
    }
});



app.post('/users',(req,res)=>{
    
    console.log(req.body);
    if (req.body.email!=undefined){
    connection.db.collection('users',(err,collection)=>{
        
        collection.save(req.body).then(()=>res.send("Uploaded")).catch(err=>res.send("Error: "+err));
    })
    }
});


app.post('/login',(req,res)=>{
    
    console.log(req.body);
    if (req.body.email!=undefined){
    connection.db.collection('users',(err,collection)=>{
        
        collection.find(req.body).toArray((err,results)=>{
            console.log(results);
            if (results.length>0){
            res.send("login")
        }
        
        else {
            res.send("again");
        }
    }
    )})
    }
});

app.post('/rate',(req,res)=>{
    var revNumbers=0;
    connection.db.collection('sample',(err,collection)=>{
        console.log(req.body);
        collection.find({
                        reg:req.body.reg
                        
        }).toArray((err,results)=>{

            revNumbers=results[0].reviews+1;
            console.log(revNumbers);
            connection.db.collection('sample',(err, collection)=>{
                collection.updateOne({"reg":req.body.reg},
                                    {$set:{"reviews":revNumbers}})
            });
        });
        })
    
    
    
    
    console.log(req.body);
    if (req.body.name!=undefined){
    connection.db.collection('reviews',(err,collection)=>{
        
    collection.save(req.body).then(()=>res.send("Uploaded")).catch(err=>res.send("Error: "+err));
    })
    }
});

app.get('/reviews',(req,res)=>{
    

    connection.db.collection('reviews',(err,collection)=>{
    console.log(req.query);
    collection.find({
                    reg:eval(req.query.reg)
                    
    }).toArray((err,results)=>{res.send(JSON.stringify(results))});
    })
    
});