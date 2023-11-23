const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  phoneNo:''
}, {
  timestamps: true,
});

const Login = mongoose.model('login', loginSchema);

module.exports = Login;