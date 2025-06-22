import { Route, Routes } from "react-router-dom";
import "./index.css";
import AddTask from "./components/AddTask";
import Sidebar from "./components/Sidebar";
import AllTasks from "./components/AllTasks";
import CompleteTask from "./components/CompleteTask";
import InProgressTask from "./components/InProgressTask";
// import Dashboard from "./components/StatsTask";
import PendingTask from "./components/PendingTask";
import Deployed from "./components/Deployed";
// import Deferred from "./components/Deferred";
import ManageTask from "./components/ManageTask";
import "./App.css";
import StatsTask from "./components/StatsTask";

const App = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/allTask" element={<AllTasks />} />
        <Route path="/completeTask" element={<CompleteTask />} />
        <Route path="/pendingTask" element={<PendingTask />} />
        <Route path="/deployedTask" element={<Deployed />} />
        {/* <Route path="/deferredTask" element={<Deferred />} /> */}
        <Route path="/ManageTasks" element={<ManageTask />} />
        <Route path="/inProgressTask" element={<InProgressTask />} />
        <Route path="/statsTask" element={<StatsTask/>} />
      </Routes>
    </div>
  );
};

export default App;
