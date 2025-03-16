const mongoose = require("mongoose");

// Venue Schema
const VenueSchema = new mongoose.Schema({
  address: { type: String, required: true },
  capacity: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  image: { type: String }
}, { timestamps: true });

const Venue = mongoose.model("Venue", VenueSchema);
