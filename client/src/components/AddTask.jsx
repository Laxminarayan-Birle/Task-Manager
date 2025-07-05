import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  updateExistingTask,
  fetchAllTasks,
} from "../store/taskSlice";
import { useNavigate } from "react-router-dom";
import { Loadpage } from "../store/Loadslice";
import { addFormdata } from "../store/FormSlice";
import { setshowform } from "../store/ShowFormSlice";

const AddTask = () => {
  const isedit = useSelector((state) => state.showform);   // fix
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

  useEffect(() => {
    if (isedit && Editdata && Editdata._id) {
      setFormData({
        title: Editdata.title || "",
        description: Editdata.description || "",
        startDate: Editdata.startDate ? new Date(Editdata.startDate) : new Date(),
        endDate: Editdata.endDate ? new Date(Editdata.endDate) : null,
        status: Editdata.status || "Pending",
        assignee: Editdata.assignee || "",
        priority: Editdata.priority || "High",
      });
    }
  }, [isedit, Editdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEndDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      endDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
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
    console.log(isedit);
    console.log(Editdata);
    console.log(Editdata.id)
    if (isedit && Editdata && Editdata.id) {
       dispatch(updateExistingTask({ id: Editdata.id, updatedData: payload }));
    } else {
       dispatch(addNewTask(payload));
    }

    // reset form
    setFormData({
      title: "",
      description: "",
      startDate: new Date(),
      endDate: null,
      status: "Pending",
      assignee: "",
      priority: "High",
    });

    dispatch(fetchAllTasks());
    dispatch(Loadpage());
    dispatch(addFormdata([]));
    dispatch(setshowform(false));
    navigate("/dashboard");
  };

  return (
    
    <div className="w-[70%] mx-auto ml-4">
      <h1 className="text-3xl font-bold my-8 text-center">
        {isedit ? "Edit Task" : "Add New Task"}
      </h1>
      <div className="grid place-items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-12 sm:mt-0">
          {/* Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded border focus:outline-none"
              required
              maxLength={15}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded border focus:outline-none"
              required
              maxLength={50}
            />
          </div>

          {/* Priority and Status */}
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 rounded border focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            {/* <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 rounded border focus:outline-none"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Deployed</option>
                <option>Deferred</option>
              </select>
            </div> */}
          </div>

          {/* End Date and Assignee */}
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">End Date</label>
              <DatePicker
                selected={formData.endDate}
                onChange={handleEndDateChange}
                className="w-full p-2 rounded border focus:outline-none"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {/* <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Assignee</label>
              <input
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full p-2 rounded border focus:outline-none"
                maxLength={20}
              />
            </div> */}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded hover:bg-slate-700"
          >
            {isedit ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
