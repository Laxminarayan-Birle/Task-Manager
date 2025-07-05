import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTasks, fetchAllTasks } from "../store/taskSlice";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AllTasks = () => {
  const tasks = useSelector(selectAllTasks);
  const load = useSelector((state) => state.loadui);
  const [toggle, settoggle] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchKey, setSearchKey] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const isStatusMatch =
        statusFilter === "All" ||
        task.status.toLowerCase() === statusFilter.toLowerCase();
      const isPriorityMatch =
        priorityFilter === "All" ||
        task.priority.toLowerCase() === priorityFilter.toLowerCase();
      const isSearchMatch =
        searchKey === "" ||
        task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        task.description.toLowerCase().includes(searchKey.toLowerCase());
      return isStatusMatch && isPriorityMatch && isSearchMatch;
    });
    setFilteredTasks(filtered);
  }, [load, tasks, searchKey, statusFilter, priorityFilter]);

  return (
    <div className="w-[70%] mx-auto">
      <div className="mt-10">
        <h1 className="text-3xl font-[1000] ubuntu-bold my-8 mx-8 text-center">All Task</h1>
        <div className="flex mt-10 justify-between items-center sm:flex-row gap-4 flex-col-reverse">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <p className="sm:block hidden font-bold text-xl text-slate-900">
              <FaSearch />
            </p>
            <input
              className="bg-gray-200 p-2 rounded-xl w-[60vw] sm:w-auto appearance-none"
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="flex gap-2 flex-col sm:flex-row items-center">
            <p className="font-bold text-xl text-slate-900">Sort</p>
            <div className="flex justify-center gap-[10px] sm:gap-3 flex-row items-center">
              <select
                className="bg-gray-200 p-2 rounded-xl"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Deployed">Deployed</option>
                <option value="Deferred">Deferred</option>
              </select>
              <select
                className="bg-gray-200 p-2 rounded-xl"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="flex flex-col gap-y-5 mt-10 overflow-auto h-[70vh] sm:h-[70vh]">
          {filteredTasks.map((task) => (
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

export default AllTasks;
