const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middlewares/auth");

router.post("/add", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all tasks
router.get("/getAllTasks", auth, async (req, res) => {

  try {
    await req.user.populate({
      path: "tasks",
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get /tasks?limit=2 ->pagination
//GEt /tasks?limit=2&skip=2 ->pagination
//GET /tasks?sortBy=_id:asc ->sorting
router.get("/getTasks", auth, async (req, res) => {
  const match = {};
  const sort={}
  //sorting
  if(req.query.sortBy){
    const parts=req.query.sortBy.split(':');
    sort[parts[0]]=parts[1]==='asc'?1:-1;
  }
  const limit=req.query.limit?parseInt(req.query.limit):0;
  const skip=req.query.skip?parseInt(req.query.skip):0;

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit,
        skip,
        sort
      }
    });

    res.send(req.user.tasks);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

//update task
router.patch("/update/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["date", "status"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found");
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete task
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send({ error: "Invalid id" });
    res.status(200).send({message:"Task Deleted"});
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
