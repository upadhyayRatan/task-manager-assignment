const express = require("express");
require("dotenv").config()
require("./db/mongoose");

const User = require("./src/models/users");
const Task = require("./src/models/task.js");
const userRouter=require('./src/routers/user')
const taskRouter=require('./src/routers/task');

const app = express();
const port = process.env.PORT;

const multer=require('multer')
const upload=multer({
  dest:'images'
})

app.post('/uploadFile',upload.single('profilePhoto') ,(req,res,next)=>{
res.send()
})


app.use(express.json());
//use user and task routees
app.use('/users',userRouter)
app.use('/tasks',taskRouter)


app.listen(port, () => {
  console.log("Server is up on port", port);
});