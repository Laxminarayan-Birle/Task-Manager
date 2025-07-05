const mongoose =require("mongoose");
const bcrypt=require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    mobile:{
        type:Number,
        required:true,
        match:/^[0-9]{10}$/,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
   
    
},{timestamps:true});


userSchema.pre("save",async function (next) {
    
    if(!this.isModified("password"))
        return next();

    this.password=await bcrypt.hash(this.password,10);

    next();
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password);
};

module.exports=mongoose.model("User",userSchema);