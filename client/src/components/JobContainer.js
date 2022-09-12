import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import { getAllJobs } from "../redux-store/features/jobsSlice";
import Job from "./Job";
import Loading from "./Loading";

const JobContainer = () => {
  const { jobs, isLoading, page, totalJobs } = useSelector(
    (state) => state.jobs
  );
  const { user, token } = useAppContext();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs({ userId: user._id, token }));
  }, [token, user._id, dispatch]);

  const allJobs = Object.values(jobs);

  if (isLoading) {
    <Loading center />;
  }
  if (!isLoading && !jobs) {
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{allJobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {allJobs.map((job) => {
          return <Job key={job.jobId} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobContainer;
