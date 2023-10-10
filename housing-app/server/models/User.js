const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname:    String,
  lastname:     String,
  email:        String,
  username:     String,
});


module.exports = mongoose.model('User', userSchema);

