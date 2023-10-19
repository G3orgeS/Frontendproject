const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title:            { type: String, required: true },
  address:          { type: String, required: true },
  size:             { type: String, required: true },
  numberOfRooms:    { type: String, required: true },
  cost:             { type: String, required: true },
  description:      { type: String, required: true },
  period:           { type: String, required: true },
  type:             { type: String, required: true },
  city:             { type: String, required: true },
  zipcode:          { type: String, required: true },
  img:              [String],
  firstDate:        { type: Date, required: true },
  floor:            { type: Number, required: true },
  recommendation:   { type: Number, required: true },
  extras:           [String],
  landlord:         [String]
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
