const mogoose = require("mongoose");

const Requirement = mogoose.model("Requirement", {
  registration: String,
  name: String,
  classroom: String,
  course: String,
  schoolGrade: String,
  requirement: String,
  date: String,
  time: String,
});

module.exports = Requirement;
