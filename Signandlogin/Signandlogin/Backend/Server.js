const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());


const mongoURI = 'mongodb://localhost:27017/Newdatabase';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(error => console.log('MongoDB connection error:', error));
// create signup Schema definition 
const signupSchema=new 
mongoose.Schema({
    name:{
type:String,
required:true,
    },
    email:{
        type:String,
 required:true,
 unique:true,
    },
    password:{
        type:String,
        required:true,  
    }
});

// create User Model 
const Signup=mongoose.model('Signup',signupSchema);
// Post Api 
app.post('/api/signup',async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    // check for missing feilds 
    if(!name || !email || !password){
        return res.status(400).json({message:'All feilds are required'});
 }
 // create a new user instance 
 const newUser=new Signup({
    name,
    email,
    password
 });
 // save the user to the database 
 await newUser.save();
 res.status(201).json({message:'User created successfully',user:newUser});
    }
     catch (error){
        console.error(error);
        res.status(500).json({message:'Error creating user '});
     }
});
/// Login api 
app.post('/api/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await Signup.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not Found"});    
        }
        if(user.password!==password){
            return res.status(400).json({message:"Password is not match"});    
 
        }
        res.status(200).json({message:"Loign Successfull"});
    }
    catch(error){
res.status(500).json({message:'error during login'});
    }
}
)
// User post api 

// create User Schema definition 
const UserSchema=new 
mongoose.Schema({
   firstName:{
type:String,
required:true,
    },
    lastName:{
        type:String,
 required:true,
 unique:true,
    },
    dob:{
        type:String,
         
    },
    email:{
        type:String,
        required:true,  
    },
    remark:{
        type:String,
        required:true,  
    },
    address:{
        type:String,
        required:true,  
    },
});
// create User Model 
const User=mongoose.model('User',UserSchema);
// post api users 

app.post('/api/user',async(req,res)=>{
    try{
    const {firstName,lastName,dob,email,remark,address}=req.body;

 // create a new user instance 
 const newUser=new User({
    firstName,
    lastName,
    dob,
    email,
    remark,
    address
 });
 // save the user to the database 
 await newUser.save();
 res.status(201).json({message:'User created successfully',user:newUser});
    }
     catch (error){
        console.error(error);
        res.status(500).json({message:'Error creating user '});
     }
});

// get all api 

app.get('/api/user',async (req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }
    catch(erro){
        console.error(error)
        res.status(500).json({message:'Error during fetching users'});
    }
});
/// delete api 
app.delete('/api/user/:id',async(req,res)=>{
    try{
const userId=req.params.id;  
if(!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({message:'Invalid User Id'});
}
const deletuser=await User.findByIdAndDelete(userId);
if(!deletuser){
    return res.status(404).json({message:'User Not Found'});
}
res.status(200).json({message:'User Deleted Succefully',user:deletuser});
    }
    catch(error){
console.error(error)
res.status(500).json({message:'Error during user delete'});
    }
});






const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

