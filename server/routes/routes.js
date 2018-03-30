const express = require('express');
const bodyParser = require('body-parser');

// note Scheema
const Note = require('../../models/notes');
const router = express.Router();
const debug = require("debug")("APP:routes");

// Basic Handler
router.get('/', (req, res) => {
    res.render('index');
});



module.exports = router;