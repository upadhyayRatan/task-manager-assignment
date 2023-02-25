const mongoose = require("mongoose");
//create model

const taskSchema = new mongoose.Schema({
  date:{
    type:Date,
    required:true,
    trim:true
  },
  task: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required:true,
    default: "Incomplete",
    trim:true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }
},{
  timestamps:true
})
const Task = mongoose.model("Task",taskSchema);
module.exports = Task;
