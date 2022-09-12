import React from "react";
import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendar } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Link } from "react-router-dom";

const Job = ({
  _id,
  jobId,
  position,
  company,
  createdAt,
  jobLocation,
  jobType,
  status,
}) => {
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendar />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => console.log("set edit job")}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => console.log("delete")}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
