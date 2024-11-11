const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express
const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/Test';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Signup Schema
const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create Signup Model
const SignUp = mongoose.model('SignUp', signupSchema);

// SignUp API
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new signup instance
    const newSignUp = new SignUp({ name, email, password });

    // Save to database
    await newSignUp.save();
    res.status(201).json({ message: "Signup successful", SignUp: newSignUp });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignUp.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  remark: { type: String }
});

// Create User model
const User = mongoose.model('User', userSchema);

// API endpoint to add a new user (POST request)
app.post('/api/adduser', async (req, res) => {
  try {
    const { firstName, lastName, dob, email, address, remark } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, dob, email, address, remark });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User added successfully", client: newUser });

  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
});

// Client Schema (same as User schema, but with number)
const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  remark: { type: String }
});

// Create Client model
const Client = mongoose.model('Client', clientSchema);

// API endpoint to add a new client
app.post('/api/addclient', async (req, res) => {
  try {
    const { firstName, lastName, dob, email, number, address, remark } = req.body;

    // Check if the email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Client with this email already exists" });
    }

    // Create new client
    const newClient = new Client({ firstName, lastName, dob, email, number, address, remark });

    // Save to database
    await newClient.save();
    res.status(201).json({ message: "Client added successfully", client: newClient });

  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ message: "Error adding client", error: error.message });
  }
});


app.get('/api/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error during fetching Users'})
    }
}); 

// Start the server
app.listen(3000, () => {
  console.log(`Server is running at port 3000`);
});
