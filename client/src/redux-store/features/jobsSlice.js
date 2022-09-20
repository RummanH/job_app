import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const URL = "https://localhost:5000";
const initialState = {
  isLoading: false,
  error: "",
  jobs: {},
  totalJobs: 0,
  numOfPages: 0,
  page: 1,
};

export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (token, thunkAPI) => {
    try {
      const { position, company, jobLocation, jobType, status } =
        thunkAPI.getState().jobInput;

      const res = await axios.post(
        `${URL}/api/v1/jobs`,
        {
          position,
          company,
          jobLocation,
          jobType,
          status,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (user, thunkAPI) => {
    try {
      const res = await axios(`${URL}/api/v1/users/${user.userId}/jobs`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      return res.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearJobs: () => {
      return initialState;
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: "",
        jobs: { ...state.jobs, [action.payload.job.jobId]: action.payload.job },
      };
    },
    [createJob.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },

    [getAllJobs.fulfilled]: (state, action) => {
      const {
        totalJobs,
        numOfPages,
        data: { jobs },
      } = action.payload;

      return {
        ...state,
        isLoading: false,
        error: "",
        totalJobs,
        numOfPages,
        jobs: { ...state.jobs, ..._.mapKeys(jobs, "jobId") },
      };
    },

    [getAllJobs.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { clearJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
