const mongoose=require('mongoose');
console.log("DB url",process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL,{
})


// const Task=mongoose.model('task',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         default:false,
//         type:Boolean
//     }
// })

// const task=new Task({
//     description:"Add numbers",
//     completed:false
// })

//task.save().then((task)=>console.log(task)).catch((err)=>console.log("Error",err));