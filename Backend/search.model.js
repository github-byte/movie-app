const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = new Schema({
  movie:String
}, {
  timestamps: true,
});

const Search = mongoose.model('search', searchSchema);

module.exports = Search;