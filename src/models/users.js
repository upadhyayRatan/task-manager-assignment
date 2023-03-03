const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task');
const { number } = require("sharp/lib/is");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be grater than 0");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(password) {
      if (password.length <= 6)
        throw new Error("Password must be greater than 6");
      if (password.toLowerCase().includes("password"))
        throw new Error("Password should not contain 'password' ");
    },
  },
  otp:{
    type:String,
    trim:true,
    validate(otp){
      if (otp.length < 4)
        throw new Error("otp must be of 4 digits");
    }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
},{
  timestamps:true
});
//for relation between user and task model using user-id
userSchema.virtual('tasks',{
  ref:'Task',
  localField:"_id",
  foreignField:'owner'
})

userSchema.methods.toJSON=function(){
  const user=this;
  const userObject=user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
}

//generate token for user
//.methods is used for a single document
userSchema.methods.generateToken= async function(){
  const user=this;
  const token=jwt.sign({_id:user.id.toString()},process.env.JWT_SECRETKEY,{expiresIn:'5m'});
  user.tokens=user.tokens.concat({token});
  await user.save();
  return token;
}

//check credentials before login
//statics is used for whole collection
userSchema.statics.findBycredentials=async(email,password)=>{
  try{
    const user=await User.findOne({email});
    if(!user) throw new Error("Invalid username")
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch) throw new Error("Invalid password")
    return user;
  }
  catch(e){
    throw new Error(e);
  }
  
  
}

//hash plain text pwd before before saving 
userSchema.pre('save',async function (next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()

})
//delete task when user is deleted
userSchema.pre('remove',async function(next){
const user=this;
await Task.deleteMany({owner:user._id});
next()
})
//create model
const User = mongoose.model("User", userSchema);

module.exports = User;
