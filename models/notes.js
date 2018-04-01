/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 11:16:53
 * @modify date 2018-04-01 11:16:53
 * @desc Scheema for a Note Model
*/

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
