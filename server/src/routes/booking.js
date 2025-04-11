const { Router } = require("express");
const { getAllBookings,getBookingsByVenueId } = require("../controllers/booking");
const app = Router();

app.get('/bookings',  getAllBookings )
app.get('/bookings/:venueId',  getBookingsByVenueId )



module.exports = app;


