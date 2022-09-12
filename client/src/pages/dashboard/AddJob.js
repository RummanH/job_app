import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow, FormRowSelect } from "../../components";
import {
  changeInput,
  clearAll,
} from "../../redux-store/features/jobInputSlice";
import { createJob } from "../../redux-store/features/jobsSlice";

const AddJob = () => {
  const dispatch = useDispatch();
  const {
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
  } = useSelector((state) => state.jobInput);

  const { error } = useSelector((state) => state.jobs);
  const { showAlert, displayAlert, token } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert({ type: "danger", text: "Please provide all values!" });
      return;
    }
    await dispatch(createJob(token));
    dispatch(clearAll());
    if (!error) {
      displayAlert({ type: "success", text: "Successfully added job!" });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(changeInput({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleChange}
          />

          {/* position */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleChange}
          />

          {/* position */}
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleChange}
          />

          {/*job type*/}
          <FormRowSelect
            name="jobType"
            options={jobTypeOptions}
            handleChange={handleChange}
            value={jobType}
            labelText="job type"
          />

          {/*job status*/}

          <FormRowSelect
            name="status"
            options={statusOptions}
            handleChange={handleChange}
            value={status}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(clearAll());
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
