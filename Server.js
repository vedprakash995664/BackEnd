
//connect express to mongodb
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const { error } = require('console');
const { type } = require('os');

//initialize express
const app=express();

app.use(bodyParser.json());

const mongoURI='mongodb://localhost:27017/DigiCodersData';
mongoose.connect(mongoURI)
.then(()=>
    console.log("Connect Successfully"))
.catch(error=>console.log(error));


//schema
const signupSchema=new
mongoose.Schema({
    User_Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});


//create Signup Model
const SignUp=mongoose.model('SignUp',signupSchema)

//post API
app.post('/api/signup',async(req,res)=>{
    try{
        const {User_Name,Email,Password}=req.body;
        //validation 
        if(!User_Name || !Email ||!Password){
            return res.status(400).json({message:"All field are required and only accept String Type"});
        }

        //create  a new signup instance
        const newSignUp=new SignUp({
            User_Name,
            Email,
            Password
        });

        //save the user to the database

        await newSignUp.save();
        res.status(201).json({message:"SignUp Successfully",SignUp:newSignUp});

    }
    catch(error){
                console.log(error);
                res.status(500).json({message:"error creating User"});
                
    }
})

app.listen(3000,()=>{
    console.log(`Server is running at port 3000`);
    
})