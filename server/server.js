const express = require('express');
var router = require("./routes/routes.js");
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan("combined"));

// specify view engine & static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));

app.use('/', router);

module.exports = app;