import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../store/taskSlice";
import { useNavigate } from "react-router-dom";
import { Loadpage } from "../store/Loadslice";
import { addFormdata } from "../store/FormSlice";
import {setshowform} from "../store/ShowFormSlice"
const AddTask = () => {
  const isedit = useSelector((state) => state.showform);
  const Editdata = useSelector((state) => state.formdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: Editdata.title,
    description: Editdata.description,
    startDate: Editdata.startDate || new Date(),
    endDate: Editdata.endDate,
    status: "Pending" || Editdata.status ,
    assignee: Editdata.assignee,
    priority: Editdata.priority || "High",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: date,
    });
  };

  const handleStartDateChange = (date) => {
    // Check if date is a valid Date object
    if (date instanceof Date && !isNaN(date)) {
      setFormData({
        ...formData,
        startDate: date,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serializableFormData = {
      ...formData,
      startDate:
        typeof formData.startDate === "string"
          ? formData.startDate
          : formData.startDate.toISOString(),
      endDate: formData.endDate
        ? typeof formData.endDate === "string"
          ? formData.endDate
          : formData.endDate.toISOString()
        : null,
    };

    if (isedit) {
      // Update existing task
      dispatch(updateTask({ id: Editdata.id, ...serializableFormData }));
    } else {
      // Add new task
      dispatch(addTask(serializableFormData));
    }

    // Reset the form data
    setFormData({
      title: "",
      description: "",
      startDate: new Date(),
      endDate: "",
      status: "Pending",
      assignee: "",
      priority: "",
    });
    dispatch(Loadpage());
    dispatch(addFormdata([]));
    dispatch(setshowform(false));
    navigate("/");
  };

  return (
    <div className="w-[70%] mx-auto ml-4">
      <div className="">
        <h1 className="text-3xl font-bold my-8 text-center">
          {isedit ? "Edit Task" : "Add New Task"}
        </h1>
        <div className="grid place-items-center">
          <form
            className="w-full mt-12 sm:mt-0 max-w-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  type="text"
                  placeholder="Task Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={15}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full resize-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  placeholder="Task Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 sm:mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="appearance-none block w-[280px] sm:w-[245px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            {/* <div className="flex flex-wrap -mx-3 mb-2 sm:mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deployed">Deployed</option>
                  <option value="Deferred">Deferred</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="High">HIgh</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div> */}
            <button
              type="submit"
              className="mt-8 w-full p-3 bg-slate-900 rounded-lg text-center text-white hover:bg-slate-400"
            >
              {isedit ? "Edit Task" : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
