const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favSchema = new Schema({
  id:String,
  tvid:String,
  add:String
}, {
  timestamps: true,
});

const Fav = mongoose.model('fav', favSchema);

module.exports = Fav;