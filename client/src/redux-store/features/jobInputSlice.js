import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
};

const jobInputSlice = createSlice({
  name: "jobInput",
  initialState,
  reducers: {
    changeInput: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearAll: () => {
      return initialState;
    },
  },
});

export const { changeInput, clearAll } = jobInputSlice.actions;

export default jobInputSlice.reducer;
