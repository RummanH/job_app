const jobsMongo = require("./jobs.mongo");
const jobs = require("./jobs.mongo");

const DEFAULT_USER_NUMBER = 0;

async function getLatestJobId() {
  const latestJob = await jobsMongo.findOne().sort("-jobId");
  if (!latestJob) {
    return DEFAULT_USER_NUMBER;
  }
  return latestJob.jobId;
}

async function saveJob(job) {
  job.jobId = (await getLatestJobId()) + 1;
  return await jobs.create(job);
}

async function getAllJobs(filter) {
  return await jobs.find(filter, { __v: 0 });
}

module.exports = { saveJob, getAllJobs };
