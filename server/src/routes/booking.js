const { Router } = require("express");
const { getAllBookings,getBookingsByVenueId, bookVenue } = require("../controllers/booking");
const app = Router();

app.get('/bookings',  getAllBookings )
app.get('/bookings/:venueId',  getBookingsByVenueId )
app.post('/bookings', bookVenue )



module.exports = app;


