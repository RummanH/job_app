const express = require("express");
const catchAsync = require("../../services/catchAsync");
const { httpProtect, httpUpdatePassword } = require("./auth.controller");
const jobsRouter = require("../jobs/jobs.router");

const {
  httpSignupUser,
  httpLoginUser,
  httpUpdateUser,
  httpGetOneUser,
  httpGetAllUsers,
  httpUpdateMe,
} = require("./users.controller");

const router = express.Router();

router.use("/:userId/jobs", jobsRouter);

//Not RESTFul
router.post("/signup", catchAsync(httpSignupUser));
router.post("/login", catchAsync(httpLoginUser));
router.patch("/update", catchAsync(httpProtect), catchAsync(httpUpdateUser));

router.patch("/updateMe", catchAsync(httpProtect), catchAsync(httpUpdateMe));
router.patch(
  "/updateMyPassword",
  catchAsync(httpProtect),
  catchAsync(httpUpdatePassword)
);

//RESTFul
router.route("/").get(catchAsync(httpGetAllUsers));
router.route("/:id").get(catchAsync(httpGetOneUser));

module.exports = router;
