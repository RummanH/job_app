import { configureStore } from "@reduxjs/toolkit";

import jobInputReducer from "./features/jobInputSlice";
import jobsReducer from "./features/jobsSlice";

export const store = configureStore({
  reducer: {
    jobInput: jobInputReducer,
    jobs: jobsReducer,
  },
});
