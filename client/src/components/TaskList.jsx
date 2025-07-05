import { useSelector } from 'react-redux';
import Task from './Task'; // Reference the Task component
import { selectAllTasks } from '../store/taskSlice';
import { useState, useEffect } from "react";
import UpcomingTaskNotifier from "./UpcomingTaskNotifier";

const TaskList = () => {
    const tasks = useSelector(selectAllTasks);
     const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          credentials: "include", // if you use cookies/session
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

    return (
        <div>
             {user && (
        <UpcomingTaskNotifier
          tasks={tasks}
          userPhoneNumber={user.phoneNumber}
        />
      )}
        <ul className="task-list">
            {tasks.map(task => (
                <Task key={task._id} {...task} id={task._id} /> 
            ))}
        </ul>
        </div>
    );
};

export default TaskList;