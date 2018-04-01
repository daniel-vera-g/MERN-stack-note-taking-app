/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 11:17:47
 * @modify date 2018-04-01 11:17:47
 * @desc Nodejs app configuration
*/

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const debug = require('debug')('APP:server')
const app = express();
const reload = require('reload');

// morgan logging utility
app.use(morgan("combined"));
// specify view engine & static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));
app.use(express.static(path.join(__dirname, "../client")));
// body parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// mongoose
mongoose.connect(process.env.DB_CONN);

// router
var router = require("./routes/routes.js");
app.use('/', router);

reload(app);

module.exports = app;