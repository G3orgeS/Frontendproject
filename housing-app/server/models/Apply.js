const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  user: { type: String, required: true },
  houseselection: [{ type: Schema.Types.Mixed, required: true }], // Använd Schema.Types.Mixed för att hantera blandade datatyper
});

module.exports = mongoose.model('Application', applicationSchema);
