import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/tasks"; // Adjust if hosted elsewhere

// Thunks for GET operations
export const fetchAllTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const res = await axios.get(`${BASE_URL}/dashboard`);
  return res.data;
});

export const fetchCompletedTasks = createAsyncThunk("tasks/fetchCompleted", async () => {
  const res = await axios.get(`${BASE_URL}/completed`);
  return res.data;
});

export const fetchMissedTasks = createAsyncThunk("tasks/fetchMissed", async () => {
  const res = await axios.get(`${BASE_URL}/missed`);
  return res.data;
});

export const fetchPendingTasks = createAsyncThunk("tasks/fetchPending", async () => {
  const res = await axios.get(`${BASE_URL}/pending`);
  return res.data;
});

export const fetchUpcomingTasks = createAsyncThunk("tasks/fetchUpcoming", async () => {
  const res = await axios.get(`${BASE_URL}/upcoming`);
  return res.data;
});

export const fetchTasksByStatus = createAsyncThunk("tasks/fetchByStatus", async (status) => {
  const res = await axios.get(`${BASE_URL}/state/${status}`);
  return res.data;
});

// Thunks for POST, PUT, DELETE
export const addNewTask = createAsyncThunk("tasks/create", async (taskData) => {
  const res = await axios.post(`${BASE_URL}`, taskData);
  return res.data;
});

export const updateExistingTask = createAsyncThunk("tasks/update", async ({ id, updatedData }) => {
  const res = await axios.put(`${BASE_URL}/update/${id}`, updatedData);
  return res.data;
});

export const removeTask = createAsyncThunk("tasks/delete", async (id) => {
  await axios.delete(`${BASE_URL}/delete/${id}`);
  return id;
});

export const toggleTaskCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (id) => {
    const res = await axios.patch(`${BASE_URL}/${id}/toggle`);
    return res.data;
  }
);


// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    all: [],
    completed: [],
    pending: [],
    upcoming: [],
    missed: [],
    byStatus: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get all tasks
      // .addCase(fetchAllTasks.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      // .addCase(fetchAllTasks.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })

      // Completed tasks
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.completed = action.payload;
      })

      // Missed
      .addCase(fetchMissedTasks.fulfilled, (state, action) => {
        state.missed = action.payload;
      })

      // Pending
      .addCase(fetchPendingTasks.fulfilled, (state, action) => {
        state.pending = action.payload;
      })

      // Upcoming
      .addCase(fetchUpcomingTasks.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })

      // By Status
      .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
        state.byStatus = action.payload;
      })

      // Create
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.all.push(action.payload);
      })

      // Update
      .addCase(updateExistingTask.fulfilled, (state, action) => {
        const index = state.all.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.all[index] = action.payload;
        }
      })

      // Delete
      // .addCase(removeTask.fulfilled, (state, action) => {
      //   state.all = state.all.filter(task => task._id !== action.payload);
      // })

      .addCase(removeTask.fulfilled, (state, action) => {
      const taskIndex = state.all.findIndex((task) => task._id === action.payload);
      state.all.splice(taskIndex, 1);
      // localStorage.setItem("tasks", JSON.stringify(state));
    })

  //     .addCase(toggleTaskCompleted.fulfilled, (state, action) => {
  // const updatedTask = action.payload;
  // const index = state.all.findIndex((task) => task._id === updatedTask._id);
  // if (index !== -1) {
  //   state.all[index] = updatedTask;
  // }
// });

   .addCase(toggleTaskCompleted.fulfilled, (state, action) => {
  const updatedTask = action.payload;
  const index = state.all.findIndex((task) => task._id === updatedTask._id);

  if (index !== -1) {
    state.all[index] = updatedTask;  // update the task in place
  }
})

  }

});

// Selectors
export const selectAllTasks = (state) => state.tasks.all;
export const selectCompletedTasks = (state) => state.tasks.completed;
export const selectMissedTasks = (state) => state.tasks.missed;
export const selectPendingTasks = (state) => state.tasks.pending;
export const selectUpcomingTasks = (state) => state.tasks.upcoming;
export const selectTasksByStatus = (state) => state.tasks.byStatus;

export default taskSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       const newTask = {
//         id: Date.now(),
//         title: action.payload.title,
//         description: action.payload.description,
//         startDate: action.payload.startDate,
//         endDate: action.payload.endDate,
//         status: action.payload.status || "Pending",
//         assignee: action.payload.assignee || "",
//         priority: action.payload.priority || "",
//       };
//       state.push(newTask);
//       localStorage.setItem("tasks", JSON.stringify(state));
//     },
//     removeTask: (state, action) => {
//       const taskIndex = state.findIndex((task) => task.id === action.payload);
//       state.splice(taskIndex, 1);
//       localStorage.setItem("tasks", JSON.stringify(state));
//     },
//     toggleTaskCompleted: (state, action) => {
//       const task = state.find((task) => task.id === action.payload);
//       if (task) {
//          if (task.status !== "completed") {
//            task.status = "Completed";
//            task.endDate = new Date().toISOString();
//          } else {
//            task.status = "Pending";
//            task.endDate = null;
//          }
//           localStorage.setItem("tasks", JSON.stringify(state));
//       }
//     },
//     updateTask: (state, action) => {
//       const { id, ...updatedTaskFields } = action.payload;
//       const taskIndex = state.findIndex((task) => task.id === id);
//       if (taskIndex !== -1) {
//         state[taskIndex] = { ...state[taskIndex], ...updatedTaskFields };
//         localStorage.setItem("tasks", JSON.stringify(state));
//       }
//     },
//   },
// });

// export const { addTask, removeTask, toggleTaskCompleted, updateTask } =
//   taskSlice.actions;
// export default taskSlice.reducer;

// export const selectAllTasks = (state) => state.tasks;




