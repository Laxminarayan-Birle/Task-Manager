const mongoose=require("mongoose");
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  status: {
    type: String,
    enum:["Pending","Completed"],
    default: "Pending"
  },
  priority:{
      type: String,
      enum:["High","Medium","Low"],
      default:"High"
      
  },
  assignee: String,
});

module.exports = mongoose.model("Task", taskSchema);


