const express = require("express");
const catchAsync = require("../../services/catchAsync");
const { httpProtect } = require("../users/auth.controller");

const {
  httpCreateJob,
  httpGetAllJobs,
  httpUpdateJob,
  httpDeleteJob,
  httpGetStats,
} = require("./jobs.controller");

const router = express.Router({ mergeParams: true });
router.use(catchAsync(httpProtect));

router
  .route("/")
  .get(catchAsync(httpGetAllJobs))
  .post(catchAsync(httpCreateJob));
router.route("/stats").get(httpGetStats);
router.route("/:id").patch(httpUpdateJob).delete(httpDeleteJob);

module.exports = router;
