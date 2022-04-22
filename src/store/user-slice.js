import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { simulateDelay } from "../util";

export const fetchUsers = createAsyncThunk("GET/USERS", async (_, thunkAPI) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  await simulateDelay(2000);
  return data;
});

const initialState = {
  isLoading: false,
  progress: 0,
  currentRequestId: "",
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateProgress(state, action) {
      if (state.progress === 100) {
        return;
      }
      state.progress = state.progress + action.payload;
      if (state.progress > 100) {
        state.progress = 100;
      }
    },
    resetProgress(state) {
      state.isLoading = false;
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        if (state.isLoading === false) {
          state.isLoading = true;
          state.progress = 0;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.isLoading && state.currentRequestId === requestId) {
          state.users = action.payload;
          state.progress = 100;
          state.currentRequestId = "";
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("rejected", action.payload);
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
