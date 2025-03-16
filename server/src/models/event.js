const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ["concert", "cinematic"], required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    artists: [{ type: String }],  // List of artists' names or IDs
    image: { type: String }
  }, { timestamps: true });
  
  const Event = mongoose.model("Event", EventSchema);
