const express = require('express')
const { Server } = require('socket.io');
require('dotenv').config()
const port = process.env.PORT
const UserRoute = require('./routes/user')
const { createServer } = require('http');
const VenueRoute = require('./routes/venue')
const BookingRoute = require('./routes/booking')
const EventRoute = require('./routes/event')
const dbConnect = require('./db/connection')
const cors = require('cors');
const Booking = require('./models/booking');
const User = require('./models/user');
const notificationRoute = require('./routes/notification')
const app = express()
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",

  }
});
app.use(express.json())
app.use(cors())
dbConnect()

app.use(UserRoute)
app.use(VenueRoute)
app.use(EventRoute)
app.use(BookingRoute)
app.use(notificationRoute)



io.on('connection', (socket) => {

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('eventRequest',async(eventRequest) => {
    const {venue,event, booked_date} =eventRequest
    await Booking.create({venue,event, booked_date})
    const allrequest =await Booking.find().populate('event venue')
    io.emit('eventRequest', allrequest);
  });

  


});

server.listen(port, () => {
  console.log(`Socket.IO server listening on port ${port}`);
});

