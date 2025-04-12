const { Router } = require("express");
const { getAllBookings,getBookingsByVenueId, createBooking } = require("../controllers/booking");
const app = Router();

app.get('/bookings',  getAllBookings )

app.get('/bookings/:venueId',  getBookingsByVenueId )
app.post('/bookings',  createBooking )



module.exports = app;


