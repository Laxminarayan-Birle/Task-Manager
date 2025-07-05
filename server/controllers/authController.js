
const  User = require("../models/User.js");
const jwt=require("jsonwebtoken");
exports.registerUser = async (req,res)=>{
   
    try{
        console.log(req.body);
       const { firstName , lastName, email, mobile, password} =req.body;

       if (!firstName || !lastName || !mobile || !email || !password) {
          return res.status(400).json({ message: "All fields are required." });
        }

        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser= await User.create({
            firstName,
            lastName,
            email,
            mobile,
            password,
        });
        
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        console.log(token);
        res.status(201).json({
            message:"User registered successfully",
            token,
            user:{
                id:newUser._id,
                firstName:newUser.firstName,
                email:newUser.email
            },
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"});
    }
};

exports.loginUser=async (req,res)=>{
  
    try{
        
        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch=await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({id:User._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                firstName:user.firstName,
                email:user.email,
            },
        });

    }
    catch(err){
            console.log(err);
            res.status(500).json({message:"Server error"});
    }
};

exports.logoutUser = async (req, res)=>{

    return res.status(200).json({message:"Logged out successfully"});
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don’t return passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.getCurrentUser = (req, res) => {
//   if (!req.user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.status(200).json({
//     _id: req.user._id,
//     firstName: req.user.firstName,
//     email: req.user.email,
//   });
// };
