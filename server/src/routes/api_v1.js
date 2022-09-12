const express = require("express");

const AppError = require("../services/AppError");

const usersRouter = require("./users/users.router");
const jobsRouter = require("../routes/jobs/jobs.router");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/jobs", jobsRouter);

router.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = router;
