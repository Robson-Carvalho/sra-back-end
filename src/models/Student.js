const mongoose = require("mongoose");

const Student = mongoose.model("Student", {
  registration: String,
  cpf: String,
  name: String,
  password: String,
  classroom: String,
  course: String,
  schoolGrade: String,
  date: String,
  time: String,
});

module.exports = Student;
