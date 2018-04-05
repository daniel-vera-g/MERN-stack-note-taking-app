/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 11:17:21
 * @modify date 2018-04-01 11:17:21
 * @desc CRUD Routes for the Notes App
 */

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const debug = require("debug")("APP:routes");

// note Schema
const Note = require("../../models/notes");

// Basic route Handler
router.get("/", (req, res) => {
  debug("Rendering index.js");
  res.status(200).render("index");
});

/* CRUD Operations */

// insert a note
router.post("/insert", (req, res) => {

  debug(req.body);
  debug("An insert request was made");
  // create new note
  debug("Creating new note");
  let note = new Note();
  note.topic = req.body.topic;
  note.description = req.body.description;
  note.month = req.body.month;
  note.year = req.body.year;
  debug("new Note created: " + note);

  // save new note in DB
  debug("Saving note note in the DB");
  note.save(err => {
    if (err) {
      debug("There was an error %s adding the note to the DB", err);
      res.status(404).send(err);
    }
    debug("Note successfully added to the DB");
    res.status(200).send("Note successfully added to the DB!");
  });
});

// update notes
router.post("/update", (req, res) => {
  // TODO check if note exists

  // Update note in the DB
  debug("A note upadate was made: " + req.body);
  let updatedNote = {
    topic: req.body.topic,
    description: req.body.description,
    month: req.body.month,
    year: req.body.year
  };
  debug("The updated note is: " + updatedNote);
  debug("The note will be upadated");
  Note.update({ _id: req.body._id }, updatedNote, (err, result) => {
    if (err) {
      debug("Error %s updating a note", err);
      res.status(404).send(err);
    }
    debug("Note successfully updated");
    res.status(200).send("Note successfully updated");
  });
});

// delete notes
router.delete("/delete", (req, res) => {
  // TODO check if note exists

  //delete note
  let id = req.body._id;
  debug("Note with the id %s will be deleted", id);
  Note.find({ _id: id })
    .remove()
    .exec((err, Note) => {
      if (err) {
        debug("Error removing note with the id %s", is);
        res.status(404).send(err);
      }
      debug("Note with the id %s successfully removed", id);
      res.status(200).send("Note successfully removed");
    });
  });
  
  // Get All Notes
  router.get("/getAll", function(req, res) {
    // TODO check if the the note/notes exist
    // TODO Improve search
    
  var monthRec = req.query.month;
  var yearRec = req.query.year;
  debug("Getting notes with the month %s and year %s", monthRec, yearRec);
  // search notes for the requested month & year
  if (monthRec && monthRec != "All") {
    Note.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function(
      err,
      notes
    ) {
      if (err) {
        debug("Error getting the notes");
        res.send(err);
      };
      debug("Notes successfully requested" + notes);
      res.json(notes);
    });
  } else {
    debug("Finding notes for the year %s", yearRec);
    // search the notes for the requested year
    Note.find({ year: yearRec }, function(err, notes) {
      if (err) {
        debug("Error requesting notes with the year %s", yearRec);
        res.send(err);
      }
      debug("Successfully requested notes with the year %s", yearRec);
      debug(notes);
      res.json(notes);
    });
  }
});

module.exports = router;
