const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true 
  },
  event_type: {
    type: String,
    enum: ["concert", "livemusic", "music festival"],
    required: true,
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  booked_by: { 
    type: String, 
    required: true 
  },
  artists: [String],
  image: { 
    type: String 
  },
}, {timestamps: true});


const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;