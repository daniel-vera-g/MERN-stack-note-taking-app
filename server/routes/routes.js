const express = require('express');
const router = express.Router();
const debug = require("debug")("APP:routes");

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;