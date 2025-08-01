import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useSelector,useDispatch } from "react-redux";
import { selectMissedTasks ,fetchMissedTasks} from "../store/taskSlice";
import { Link } from "react-router-dom";

const MissedTask = () => {
    const dispatch = useDispatch();
  const missedTasks = useSelector(selectMissedTasks);

  useEffect(() => {
    dispatch(fetchMissedTasks());
  }, [dispatch]);
  
  // const today = new Date();
  // today.setHours(0, 0, 0, 0); // Set time to start of the day for accurate comparison

  // const completedTasks = tasks.filter((task) => {
  //   const taskEndDate = new Date(task.endDate);
  //   return taskEndDate < today;
  // });
  return (
    <div className="w-[70%] mx-auto">
      <div className="mt-10">
        <h1 className="text-3xl font-bold my-8 text-center">Missed Tasks</h1>
      </div>
      {missedTasks.length > 0 ? (
        <div className="flex flex-wrap gap-y-4 gap-x-14 overflow-y-scroll mt-5 h-[70vh] sm:h-[70vh] justify-center">
          {missedTasks.map((task) => (
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

export default MissedTask;
