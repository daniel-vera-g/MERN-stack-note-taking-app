const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require("debug")("APP:notes");

let NoteSchema = new Schema({
    topic: String,
    description: String,
    month: Number,
    year: Number
});
mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note');
