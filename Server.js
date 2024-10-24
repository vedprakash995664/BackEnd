
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
    },
    gender:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    hobbies:{
        type:[String]
    }
});


//create Signup Model
const SignUp=mongoose.model('SignUp',signupSchema)

//SignUp API
app.post('/api/signup',async(req,res)=>{
    try{
        const {User_Name,Email,Password,gender,status,hobbies}=req.body;
        //validation 
        if(!User_Name || !Email ||!Password ||!gender||!status){
            return res.status(400).json({message:"All field are required and only accept String Type"});
        }

        //create  a new signup instance
        const newSignUp=new SignUp({
            User_Name,
            Email,
            Password,
            gender,
            status,
            hobbies:hobbies || []
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

//Login Api

app.post('/api/login',async(req,res)=>{
    try{
        const {Email,Password}=req.body;
        if(!Email || !Password){
            return res.status(400).json({message:"Email and Password Both are required!..."});
        }
        //find the signup email

        const exitinguser=await SignUp.findOne({Email});
        // const exitingpass=await SignUp.findOne({Password})
        if(!exitinguser){
            return res.status(400).json({message:"Email not Found!..."});
        }
        if(exitinguser.Password!=Password){
            return res.status(400).json({message:"Worng Password not Found!..."});
            
        }
        res.status(200).json({message:"Login Suceessfully!...",SignUp:exitinguser})

    }
    catch(error){
        console.log('Error during login',error);
        res.status(500).json({message:"Error During Login"})
    }
})

//delete api
app.delete('/api/delete/:id',async(req,res)=>{
    try{
    const{id}=req.params;  //params=parameters
    //find user by id
    const deletedUser=await SignUp.findByIdAndDelete(id);
    if(!deletedUser){
        return res.status(400).json({message:"User Not Found"});
    }
    res.status(200).json({message:"User deleted successfully",SignUp:deletedUser});
}
catch(error){
    console.log('Error deleting User',error);
    res.status(500).json({message:"Error deleting user"})
    
}
})

//get api for active users

app.get('/api/signup/active',async(req,res)=>{
    try{
        const activeUser=await SignUp.find({status:"Active"});
        if(activeUser.length==0){
            return res.status(400).json({message:"No Active User"})
        }
    res.status(200).json({SignUp:activeUser})
    }
    catch{
        console.log("getting error");
        res.status(500).json({message:"Error"});
        
    }
})



app.listen(3000,()=>{
    console.log(`Server is running at port 3000`);
    
})