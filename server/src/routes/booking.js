const { Router } = require("express");
const { getAllBookings,getBookingsByVenueId, createBooking, updateBookingStatus } = require("../controllers/booking");
const app = Router();

app.get('/bookings',  getAllBookings )

app.get('/bookings/:venueId',  getBookingsByVenueId )
app.post('/bookings',  createBooking )
app.patch('/bookings/:bookingId', updateBookingStatus)



module.exports = app;


