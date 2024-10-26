const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');



const user=express();

user.use(bodyParser.json());

const mongoURI='mongodb://localhost:27017/DigiCodersData';
mongoose.connect(mongoURI)
.then(()=>console.log("Connect Successfully")
)
.catch(error=>console.log(error)
)


//Scheme

const userSchema=new
mongoose.Schema({
    Name:{
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
    Status:{
        type:String,
        required:true,
    }
});

//post
const User=mongoose.model('User',userSchema)

user.post('/api/signup',async(req,res)=>{
    try {
        const {Name,Email,Password,Status}=req.body;
        if(!Name ||!Email ||!Password||!Status){
            return res.status(400).json({message:"All Fields are required and string"});

        }

        //creating instance
        const newUser=new User({
            Name,
            Email,
            Password,
            Status
        });
        await newUser.save();
        res.status(201).json({message:"Signup Successfully",User:newUser});
        
    } catch (error) {
        console.log(error);
            res.status(500).json({message:"error creating User"});
    }
})

//delete api
user.delete('/api/delete/:id',async(req,res)=>{
    try {
        const {id}=req.params;

        //find useer by id
        const deletedUser=await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(400).json({message:"User not found"});
    
        }
        res.status(200).json({message:"User deleted successfully"});
        
    } catch (error) {
        console.log('Error deleting User',error);
        res.status(500).json({message:"Error deleting user"})
        
    }
})



//user edit

user.put('/api/edit/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const updateData=req.body
        //find id and update
        const updateUser=await User.findByIdAndUpdate(id,updateData,
            {new:true,runValidators:true}
        );
        if(!updateUser){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"User Updated successfully!..",updateUser})
    } catch (error) {
        console.log("error");
        res.status(500).json({message:"Error during update"})
        
    }
})

//login api


user.post('/api/login',async(req,res)=>{
    try{
        const {Email,Password,Status}=req.body;
        if(!Email || !Password){
            return res.status(400).json({message:"Email and Password Both are required!..."});
        }
        //find the signup email

        const existingUser=await User.findOne({Email});
        // const exitingpass=await SignUp.findOne({Password})
        if(!existingUser){
            return res.status(400).json({message:"Email not Found!..."});
        }
        if(existingUser.Password!=Password){
            return res.status(400).json({message:"Worng Password not Found!..."});
            
        }
        if(existingUser.Status!=="Active"){
            return res.status(400).json({message:"You are not Active"});
        }
        res.status(200).json({message:"Login Suceessfully!...",SignUp:existingUser})

    }
    catch(error){
        console.log('Error during login',error);
        res.status(500).json({message:"Error During Login"})
    }
})


user.listen(3000,()=>{
    console.log(`Server is running at port 3000`);
    
})