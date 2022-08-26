const express = require("express");

const {
  httpCreateJob,
  httpGetAllJobs,
  httpUpdateJob,
  httpDeleteJob,
  httpGetStats,
} = require("./jobs.controller");

const router = express.Router();

router.route("/").get(httpGetAllJobs).post(httpCreateJob);
router.route("/stats").get(httpGetStats);
router.route("/:id").patch(httpUpdateJob).delete(httpDeleteJob);

module.exports = router;
