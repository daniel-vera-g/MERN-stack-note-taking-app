const express = require('express');
const router = express.Router();
const path = require('path');

const express = require('express');

// specify view engine & static files
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(__dirname + '/client'));

app.use('/', routes);

module.exports = app;