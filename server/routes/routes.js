const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const debug = require("debug")("APP:routes");

// note Schema
const Note = require("../../models/notes");

// Basic route Handler
router.get("/", (req, res) => {
  debug("Rendering index.js");
  res.render("index");
});

/* CRUD Operations */

// insert a note
router.post("/insert", (req, res) => {
  debug(req.body);
  debug(req.body.description);
  // create new note
  debug("Creating new note");
  const note = new Note();
  note.topic = req.body.topic;
  note.description = req.body.description;
  note.month = req.body.month;
  note.year = req.body.year;

  // save new note in DB
  debug("Saving note %s in the DB", note);
  note.save(err => {
    if (err) {
      debug("There was an error %s adding the note to the DB", err);
      res.status(404).send(err);
    }
    debug("Note successfully added to the DB");
    res.status(202).send("Note successfully added to the DB!");
  });
});

// update notes
router.post("/update", (req, res) => {
  // TODO check if note exists

  // Update note in the DB
  debug(req.body);
  let updatedNote = {
    topic: req.body.topic,
    description: req.body.description,
    month: req.body.month,
    year: req.body.year
  };
  Note.update({ _id: req.body._id }, updatedNote, (err, result) => {
    if (err) {
      debug("Error %s updating a note", err);
      res.status(404).send(err);
    }
    debug("Note successfully updated");
    res.status(202).send("Note successfully updated");
  });
});

// delete notes
router.delete("/delete", (req, res) => {
  // TODO check if note exists

  // TODO delete note
  let id = req.body._id;
  Note.find({_id: id}).remove().exec((err, Note) => {
      if (err) {
          debug('Error removing note with the id %s', is);
          res.status(404).send(err);
      };
      debug('Note with the id %s successfully removed', id);
      res.status(202).send('Note successfully removed');
  });
});

// read/get all notes
router.get("/getAll", (req, res) => {
  // TODO check if the the note/notes exist

  // TODO get & send the notes to the client

});



module.exports = router;
