const express = require("express");
const cors = require("cors");
const emailRouter = require("./routes/email.router");

const app = express();
app.use(express.json());
app.use(cors({
    maxAge: 0,
    credentials: true,
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
    methods: ['POST', 'HEAD'],
    origin: 'https://dak1pni58hzx7.cloudfront.net'
}));

app.options("*", cors());

app.use("/email", emailRouter);

module.exports = app;