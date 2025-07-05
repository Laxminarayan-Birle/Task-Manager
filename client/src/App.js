import { Route, Routes } from "react-router-dom";
import "./index.css";
import AddTask from "./components/AddTask";
import Sidebar from "./components/Sidebar";
import AllTasks from "./components/AllTasks";
import CompleteTask from "./components/CompleteTask";
import UpcomingTask from "./components/UpcomingTask";
import PendingTask from "./components/PendingTask";
import MissedTask from "./components/MissedTask";
import Register from "./components/Register";
import Login from "./components/Login";
import ManageTask from "./components/ManageTask";
import StatsTask from "./components/StatsTask";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <div className="flex h-full">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Sidebar />
              <AllTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <AllTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completeTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <CompleteTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pendingTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <PendingTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/missedTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <MissedTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ManageTasks"
          element={
            <ProtectedRoute>
              <Sidebar />
              <ManageTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upcomingTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <UpcomingTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statsTask"
          element={
            <ProtectedRoute>
              <Sidebar />
              <StatsTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
