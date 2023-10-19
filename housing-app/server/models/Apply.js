const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  period:           { type: String,     required: true },
  user:             { type: String,     required: true }, 
  houseselection:   { type: [String],   required: true },
  status:           { type: String,     required: true }, 
});

module.exports = mongoose.model('Application', applicationSchema);