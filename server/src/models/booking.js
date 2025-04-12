const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: {
       ref: 'Event', type: mongoose.Schema.Types.ObjectId
      },
      venue: {
        ref: 'Venue', type: mongoose.Schema.Types.ObjectId
      },
      status:{
        enum: ["In Review", "Declined", "Approved","Pending"],
        type: String,
        default: "Pending"
      },
      booked_date: Date
},);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;




