const express = require('express')
const app = express()
const port = 9000
const UserRoute = require('./routes/user')
const dbConnect = require('./db/connection')
const cors = require('cors')

app.use(cors())
app.use(express.json())


dbConnect()
app.use(UserRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
