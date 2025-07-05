import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleTaskCompleted } from "../store/taskSlice";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Loadpage } from "../store/Loadslice";
import { removeTask,updateExistingTask } from "../store/taskSlice";
import { addFormdata } from "../store/FormSlice";
import { setshowform } from "../store/ShowFormSlice";
import { useNavigate } from "react-router-dom";
const TaskCard = ({
  id,
  title,
  description,
  startDate,
  endDate,
  status,
  assignee,
  priority,
}) => {
  // const load = useSelector((state) => state.loadui);
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    if(!status) return "bg-white";
    switch (status.toLowerCase()) {
      case "Completed":
        return "bg-green-200 text-green-800";
      case "in progress":
        return "bg-blue-200 text-blue-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "deferred":
        return "bg-gray-200 text-gray-800";
      case "deployed":
        return "bg-purple-200 text-purple-800";
      default:
        return "bg-yellow-200 text-yellow-800";
    }
  };

  const handleToggleCompleted = () => {
    dispatch(toggleTaskCompleted(id));
    setComplete(!complete);
  };

  const handleDeleteTask = (id) => {
    // dispatch(Loadpage);
    dispatch(removeTask(id));
  };
  const handleUpdateTask = (id) => {
    const data = {
      id,
      title,
      description,
      startDate,
      endDate,
      status,
      assignee,
      priority,
    };
    
    dispatch(addFormdata(data));
  // dispatch(updateExistingTask({id,data}));
    dispatch(setshowform(true));
    navigate("/addTask");
  };

  return (
    // <div className="flex flex-row items-center justify-between w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg border">
    //   <div className={`p-4 rounded-lg ${getStatusColor(status)} w-1/4`}>
    //     <h1 className="text-sm font-semibold text-end">{priority}</h1>
    //     <h2 className="text-xl font-bold text-center">{title}</h2>
    //   </div>

    //   <div className="flex flex-col justify-between w-2/4 p-4">
    //     <p className="text-sm mb-2">{description}</p>
    //     <div className="flex justify-between text-xs font-semibold">
    //       {/* <div>
    //         <p>Start Date</p>
    //         <p>{getDate(startDate)}</p>
    //       </div> */}
    //       <div>
    //         <p>End Date</p>
    //         <p>{getDate(endDate)}</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex flex-row items-center justify-between w-1/4 p-4">
    //     {/* <p className="text-xs text-gray-700">{assignee || "Unassigned"}</p> */}
    //     <button
    //       onClick={handleToggleCompleted}
    //       className={`mt-2 px-4 py-2 text-xs font-bold rounded-lg ${
    //         complete ? "bg-green-200 text-green-800" : getStatusColor(status)
    //       }`}
    //     >
    //       {complete ? "Completed" : status}
    //     </button>
    //     <div className="flex flex-col space-y-4">
    //       <FaEdit
    //         size={30}
    //         color="blue"
    //         onClick={() => handleUpdateTask(id)} // Pass the task id to delete
    //         className="cursor-pointer hover:text-red-600 transition-all"
    //       />

    //       <MdDelete
    //         size={30}
    //         color="red"
    //         onClick={() => handleDeleteTask(id)} // Pass the task id to delete
    //         className="cursor-pointer hover:text-red-600 transition-all"
    //       />
    //     </div>
    //   </div>
    // </div>
//   <div className="flex flex-col sm:flex-col md:flex-row items-center justify-between w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg border">
//   <div className={`p-4 rounded-lg  ${
//         complete ? "bg-green-200 text-green-800" : getStatusColor(status)
//       } w-full md:w-1/4`}>
//     <h1 className="text-sm font-semibold text-end">{priority}</h1>
//     <h2 className="text-xl font-bold text-center">{title}</h2>
//   </div>

//   <div className="flex flex-col justify-between w-full md:w-2/4 p-4">
//     <p className="text-sm mb-2">{description}</p>
//     <div className="flex justify-between text-xs font-semibold">
//       {/* <div>
//         <p>Start Date</p>
//         <p>{getDate(startDate)}</p>
//       </div> */}
//       <div>
//         <p>End Date</p>
//         <p>{getDate(endDate)}</p>
//       </div>
//     </div>
//   </div>

//   <div className="flex flex-row md:flex-row items-center justify-between w-full md:w-1/4 p-4">
//     {/* <p className="text-xs text-gray-700">{assignee || "Unassigned"}</p> */}
//     <button
//       onClick={handleToggleCompleted}
//       className={`mt-2 px-4 py-2 text-xs font-bold rounded-lg ${
//         complete ? "bg-green-200 text-green-800" : getStatusColor(status)
//       }`}
//     >
//       {complete ? "Completed" : status}
//     </button>
//     <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
//       <FaEdit
//         size={30}
//         color="blue"
//         onClick={()=>handleUpdateTask(id)} // Pass the task id to delete
//         className=" cursor-pointer hover:text-red-600 transition-all"
//       />

//       <MdDelete
//         size={30}
//         color="red"
//         onClick={()=>handleDeleteTask(id)} // Pass the task id to delete
//         className="cursor-pointer hover:text-red-600 transition-all"
//       />
//     </div>
//   </div>
// </div>

<div className="flex h-max-[30%] w-max-[30%] flex-col md:flex-row items-center md:items-start justify-between w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg border gap-4">
  {/* Priority + Title */}
  <div
    className={`p-4 rounded-lg flex-shrink-0 w-full md:w-1/4 text-center md:text-start
      ${complete ? "bg-green-200 text-green-800" : getStatusColor(status)}`}
  >
    <h1 className="text-xs sm:text-sm font-semibold text-end">{priority}</h1>
    <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
  </div>

  {/* Description */}
  <div className="flex flex-col justify-between w-full md:w-2/4 p-4 text-center md:text-start">
    <p className="text-xs sm:text-sm mb-2">{description}</p>
    <div className="flex justify-between text-[10px] sm:text-xs font-semibold">
      <div>
        <p>End Date</p>
        <p>{getDate(endDate)}</p>
      </div>
    </div>
  </div>

  {/* Actions */}
  <div className="flex flex-col md:flex-col items-center justify-between w-full md:w-1/4 p-4 space-y-2 md:space-y-4">
    <button
      onClick={handleToggleCompleted}
      className={`w-full px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-lg
        ${complete ? "bg-green-200 text-green-800" : getStatusColor(status)}`}
    >
      {complete ? "Completed" : status}
    </button>
    <div className="flex flex-row space-x-4 justify-center md:justify-start">
      <FaEdit
        onClick={() => handleUpdateTask(id)}
        color="blue"
        className="cursor-pointer hover:text-blue-600 transition-all
          text-xl sm:text-2xl md:text-3xl"
      />
      <MdDelete
        onClick={() => handleDeleteTask(id)}
        color="red"
        className="cursor-pointer hover:text-red-600 transition-all
          text-xl sm:text-2xl md:text-3xl"
      />
    </div>
  </div>
</div>


  );
};

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  assignee: PropTypes.string,
  priority: PropTypes.string,
};

export default TaskCard;
