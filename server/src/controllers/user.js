const User = require("../models/user")

const getUser = async(req, res) => {
    const data = await User.find()
    res.send(data)
  }

  const registerNewUser =async (req, res) => {
    User.create(req.body)
    res.send('user created!')
  }

  

module.exports = {getUser,registerNewUser}