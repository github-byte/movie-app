const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favSchema = new Schema({
  movid:String,
  tvid:String,
  add:String,
  name:String
}, {
  timestamps: true,
});

const Fav = mongoose.model('fav', favSchema);

module.exports = Fav;