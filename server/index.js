require("dotenv").config();
const express=require("express");
const cors = require("cors");
const  connectDB =require("./db.js");
const taskRoutes = require("./routes/task.js");
const userRoutes=require("./routes/auth.js");
const smsRoutes=require("./routes/sms.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

app.use("/api/sms", smsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
