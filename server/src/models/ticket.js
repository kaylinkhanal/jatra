const mongoose = require("mongoose");

// Ticket Schema
const TicketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seat: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true }
  }, { timestamps: true });
  
  const Ticket = mongoose.model("Ticket", TicketSchema);
  