const express = require("express");
const cors = require("cors");
const emailRouter = require("./routes/email.router");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/email", emailRouter);

module.exports = app;