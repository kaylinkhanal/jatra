const express = require("express");
const { createServer } = require("http");
const dbConnect = require("./db/connection.js");
const { Server } = require("socket.io");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 9000;

dbConnect();

const app = express();

const httpServer = createServer(app);

// socket.io  cors
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// Restful API cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// get SocketIO data
const initializeSocketIO = require("./socket/index");

initializeSocketIO(io);

// restFull api route declaration
const UserRoute = require("./routes/user");
const VenueRoute = require("./routes/venue");
const BookingRoute = require("./routes/booking");
const EventRoute = require("./routes/event");

// RestFull Api routes use data
app.use(UserRoute);
app.use(VenueRoute);
app.use(EventRoute);
app.use(BookingRoute);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Socket.IO server listening on port ${PORT}`);
});
