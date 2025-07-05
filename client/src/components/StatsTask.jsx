import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../store/taskSlice";
import { useMemo } from "react";
const Card = ({ label, count, bg, link }) => {
  return (
    <Link to={link}>
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between cursor-pointer">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
          {label.charAt(0)}
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  bg: PropTypes.string.isRequired,
};

const StatsTask = () => {
  const tasks = useSelector(selectAllTasks);
  const today = new Date();

  const stats = useMemo(() => {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const upcomingTasks = tasks.filter((task) => {
      const taskEndDate = new Date(task.endDate);
      return taskEndDate >= today;
    }).length;

    const pendingTasks = tasks.filter((task) => {
      // const startDate = new Date(task.startDate);
      return task.status === "Pending" ;
    }).length;

    const missedTasks = tasks.filter((task) => {
      const endDate = task.endDate ? new Date(task.endDate) : null;
      return task.status !== "Completed" && endDate && endDate < today;
    }).length;

    return [
      {
        label: "TOTAL TASK",
        total: totalTasks,
        bg: "bg-[#1d4ed8]",
        link:  "/AllTasks",
      },
      {
        label: "COMPLETED TASK",
        total: completedTasks,
        bg: "bg-[#0f766e]",
        link: "/CompleteTask",
      },
      {
        label: "UPCOMING",
        total: upcomingTasks,
        bg: "bg-[#f59e0b]",
        link: "/InProgressTask",
      },
      {
        label: "PENDING",
        total: pendingTasks,
        bg: "bg-[#be185d]",
        link: "/PendingTask",
      },
      {
        label: "MISSED",
        total: missedTasks,
        bg: "bg-[#f59e0b]",
        link: "/PendingTask",
      },
    ];
  }, [tasks, today]);

  return (
    <div className="mx-auto w-[80%]">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-wrap w-full justify-between">
        <h1 className="sm:text-2xl text-3xl font-bold my-8 text-center">
          Tasks
        </h1>
        <div className="h-full w-80% mx-auto py-4 px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 place-item-center">
            {stats.map(({ label, total, bg, link }, index) => (
              <Card key={index} bg={bg} label={label} count={total} link={link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTask;