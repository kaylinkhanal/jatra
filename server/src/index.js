const express = require('express')
const app = express()
const port = 9000
const UserRoute = require('./routes/user')
const dbConnect = require('./db/connection')
app.use(express.json())

dbConnect()
app.use(UserRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
