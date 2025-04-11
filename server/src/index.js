const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const UserRoute = require('./routes/user')
const VenueRoute = require('./routes/venue')
const BookingRoute = require('./routes/booking')
const { rateLimit } = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10000, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

app.use(limiter)
const dbConnect = require('./db/connection')
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
  }))
app.use(express.json())

dbConnect()
app.use(UserRoute)
app.use(VenueRoute)
app.use(BookingRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
