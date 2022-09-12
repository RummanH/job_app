const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: Number,
    company: {
      type: String,
      required: [true, "Please provide company name!"],
      maxlength: 50,
    },

    position: {
      type: String,
      required: [true, "Please provide position!"],
      maxlength: 100,
    },

    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },

    jobLocation: {
      type: String,
      // default: "my city",
      required: [true, "Must have a job location"],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
