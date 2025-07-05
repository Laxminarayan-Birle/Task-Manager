import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useSelector ,useDispatch} from "react-redux";
import { selectCompletedTasks,fetchCompletedTasks} from "../store/taskSlice";
import { Link } from "react-router-dom";
const CompleteTask = () => {
  
    const dispatch = useDispatch();
  const completedTasks = useSelector(selectCompletedTasks);

  useEffect(() => {
    dispatch(fetchCompletedTasks());
  }, [dispatch]);
  // const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="w-[70%] mx-auto">
      <div className="mt-10">
        <h1 className="text-3xl font-bold my-8 text-center">Completed Tasks</h1>
      </div>
      {completedTasks.length > 0 ? (
        <div className="flex flex-wrap gap-y-4 gap-x-14 justify-center overflow-y-scroll mt-5 h-[80vh] sm:h-[80vh]">
          {completedTasks.map((task) => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              startDate={task.startDate}
              endDate={task.endDate}
              status={task.status}
              assignee={task.assignee}
              priority={task.priority}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-[17vh] sm:mt-[30vh]">
          <p>
            No tasks found.{" "}
            <Link to="/addTask" className="text-indigo-600 font-[500]">
              Add a new task
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CompleteTask;
