const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const debug = require("debug")("APP:routes");

// note Schema
const Note = require('../../models/notes');

// Basic route Handler
router.get('/', (req, res) => {
    debug('Rendering index.js');
    res.render('index');
});

/* CRUD Operations */

// insert a note
router.post('/insert', (req, res) => {
    debug('Creating new note');
    // create new note
    let note = new Note();
    note.topic = req.body.topic;
    note.description = req.body.description;
    note.month = req.body.month;
    note.year = req.body.year;

    // save in DB
    debug('Saving note in the DB');
    note.save((err) => {
        if (err) {
            debug("There was an %s error adding the GFS to the DB", err);
            res.status(404);
            res.send('There was an ' + err + 'error adding the GFS to the DB');
        }
        debug("Note successfully added to the DB");
        res.status(202);
        res.send('Note successfully added to the DB');
    })
});

// read/get all notes
router.get('/getAll', (req, res) => {

});

// update notes
router.get('/update', (req, res) => {

});

// delete notes
router.delete('/delete', (req, res) => {

});

module.exports = router;