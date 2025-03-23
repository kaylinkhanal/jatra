const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    capacity: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      title: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      venueImage: {
        type: String, 
      },
      address: {
        type: String,
      },
}, {timestamps: true});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;