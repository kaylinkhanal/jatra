const mongoose = require("mongoose");
// Seat Schema
const SeatSchema = new mongoose.Schema({
    venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    type: { type: String, enum: ["VIP", "general"], required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, required: true }
  }, { timestamps: true });
  
  const Seat = mongoose.model("Seat", SeatSchema);