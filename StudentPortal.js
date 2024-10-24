//connect express to mongodb
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');


//initialize express

const studentPortal=express();

studentPortal.use(bodyParser.json());

const mongoURI='mongodb://localhost:27017/DigiCodersData';
mongoose.connect(mongoURI)
.then(()=>
    console.log("Connect Successfully"))
.catch(error=>console.log(error));

//schema

const registerStudent=new
mongoose.Schema({
    Mobile_Number:{
        type:Number,
        required:true
    },
    Student_Name:{
        type:String,
        required:true
    },
    Training:{
        type:String,
        required:true  
    },
    Technology:{
        type:String,
        required:true
    },
    Education:{
        type:String,
        required:true
    },
    Year:{
        type:Number,
        required:true
    },
    F_Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
    },
    Alt_Mob:{
        type:Number
    },
    College:{
        type:String,
        required:true 
    },
    Payment:{
        type:Number,
        required:true
    }
});

const register=mongoose.model('register',registerStudent)

//post api
studentPortal.post('/api/register',async(req,res)=>{
try{
    const{Mobile_Number,Student_Name,Training,Technology,Education,Year,F_Name,Email,Alt_Mob,College,Payment}=req.body;


    //creating a new register instance
    const newRigister=new register({
        Mobile_Number,
        Student_Name,
        Training,
        Technology,
        Education,
        Year,
        F_Name,
        Email,
        Alt_Mob,
        College,
        Payment
    });

    //save user to the database

    await newRigister.save();
    res.status(201).json({message:"Register Successfully",registerStudent:newRigister});
}
catch(error){
    console.log(error);
    res.status(500).json({message:"error register Student"});
}
})

studentPortal.listen(3001,()=>{
    console.log(`server running at port 3001`);
})