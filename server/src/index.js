const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const UserRoute = require('./routes/user')
const dbConnect = require('./db/connection')
const cors = require('cors')

app.use(cors())
app.use(express.json())  //json parse: for parsing application json data to req.body it helps to get data from body and save it to database.
app.use(express.urlencoded({ extended: true })) // formdata parse: for parsing application/x-www-form-urlencoded data to req.body it helps to get data from body and save it to database.

dbConnect()
app.use(UserRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
