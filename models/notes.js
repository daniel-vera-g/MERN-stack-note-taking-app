const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noteSchema = new Schema({
    topic: String,
    desription: String,
    month: String,
    year: Number
});

module.exports = mongoose.model('Note', noteSchema);