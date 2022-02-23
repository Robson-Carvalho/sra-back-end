require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;

const patternRouter = require("./routers/pattern.router");
const loginRouter = require("./routers/login.router");
const requirementRouter = require("./routers/requirement.router");
const changePasswordRouter = require("./routers/changePassword.router");
const registerRouter = require("./routers/register.router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(patternRouter);
app.use(loginRouter);
app.use(requirementRouter);
app.use(changePasswordRouter);
app.use(registerRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT);
});
