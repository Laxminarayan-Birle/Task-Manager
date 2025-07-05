const Task = require('../models/task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    res.json(tasks);
};

// Get tasks by status
exports.getTasksByStatus = async (req, res) => {
    const status = req.params.status;
    const tasks = await Task.find({ status }).lean();
    res.json(tasks);
};

// Get missed tasks
exports.getMissedTasks = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      endDate: { $lt: now }
    }).lean();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get completed tasks
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "Completed" }).lean();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask); // send the updated task directly
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ id: req.params.id, message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getPendingTask = async (req, res) => {
  try {
    const now = new Date();
    // const tasks = await Task.find({status:"Pending" 
    //   startDate: { $lte: now },
    //   endDate: { $gte: now }
    // }).lean();

    const tasks = await Task.find({
      $or: [
        { status: "Pending" },
        {
          startDate: { $lte: now },
          endDate: { $gte: now }
        }
      ]
    }).lean();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Upcoming Tasks (tasks with startDate in the future)
exports.getUpcomingTask = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({
      startDate: { $lte: now },
          endDate: { $gte: now }
    }).lean();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle a task's completion
exports.toggleTaskCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId || taskId === "undefined") {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = task.status !== "Completed" ? "Completed" : "Pending";
    // task.endDate = task.status === "Completed" ? new Date() : null;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);

  } catch (error) {
    console.error("Error toggling completed:", error);
    res.status(500).json({ message: "Server error while toggling task." });
  }
};
