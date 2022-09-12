const AppError = require("../../services/AppError");
const { saveJob, getAllJobs } = require("../../models/jobs.model");

async function httpCreateJob(req, res, next) {
  const { position, company, jobLocation, status, jobType } = req.body;
  if (!position || !company || !jobLocation) {
    return next(new AppError("Please provide all values!", 400));
  }

  const job = await saveJob({
    status,
    jobType,
    position,
    company,
    jobLocation,
    createdBy: req.user.id,
  });

  return res.status(201).json({
    status: "success",
    data: {
      job,
    },
  });
}

async function httpGetAllJobs(req, res, next) {
  if (!req.params.userId) {
    req.params.userId = req.user._id;
  }

  const jobs = await getAllJobs({ createdBy: req.params.userId });

  return res.status(200).json({
    status: "success",
    totalJobs: jobs.length,
    numOfPages: 1,
    data: {
      jobs,
    },
  });
}

async function httpUpdateJob(req, res, next) {
  return res.status(200).json({
    status: "success",
    data: {
      job: "Job",
    },
  });
}

async function httpDeleteJob(req, res, next) {
  return res.status(200).json({
    status: "success",
    data: {
      job: "Job",
    },
  });
}

async function httpGetStats(req, res, next) {
  return res.status(200).json({
    status: "success",
    data: {
      stats: "stats",
    },
  });
}

module.exports = {
  httpCreateJob,
  httpGetAllJobs,
  httpUpdateJob,
  httpDeleteJob,
  httpGetStats,
};
