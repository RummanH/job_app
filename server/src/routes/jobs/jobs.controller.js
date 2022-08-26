async function httpCreateJob(req, res, next) {
  return res.status(201).json({
    status: "success",
    data: {
      job: "Job",
    },
  });
}

async function httpGetAllJobs(req, res, next) {
  return res.status(200).json({
    status: "success",
    data: {
      jobs: "Jobs",
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
