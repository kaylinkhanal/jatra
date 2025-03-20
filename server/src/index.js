const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const UserRoute = require('./routes/user')
const VenueRoute = require('./routes/venue')

const dbConnect = require('./db/connection')
const cors = require('cors')

app.use(cors())
app.use(express.json())

dbConnect()
app.use(UserRoute)
app.use(VenueRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
