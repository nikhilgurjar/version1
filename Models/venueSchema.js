const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const atpreadingSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  reading: {
    type: String,
  },
});

const venueSchema = new mongoose.Schema({
  bycustomer: {
    type: String,
    ref: "Customer",
  },
  preatpreading: {
    type: String,
  },
  atpreaadings: [atpreadingSchema],
  servicetype: {
    type: ObjectId,
    ref: "Services",
  },
  area: {
    type: String,
  },
  areatype: {
    type: String,
  },
  areacovered: {
    type: Number,
  },
  serviceDate: [
    {
      type: Date,
    },
  ],
  expiryDate: {
    type: Date,
  },
  sanitizationDate: [
    {
      type: Date,
    },
  ],
  createdat: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("Venue", venueSchema);

module.exports = venueSchema;
