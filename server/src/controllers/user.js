const User = require("../models/user")
const bcrypt = require('bcrypt');

const getUser = async(req, res) => {
    const data = await User.find()
    res.json(data)
  }


  const registerNewUser =async (req, res) => {
    //check email if exists
    const user = await User.findOne({email: req.body.email})
    //if user exists return error
    if(user) return res.status(409).json({msg: "Email already exists"})
        //hash req.body.password before saving to db
        req.body.password = await bcrypt.hash(req.body.password, 10);
        User.create(req.body)
        res.json({msg: 'user created!'})
  }

  const loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user)  return res.status(404).json({msg: "Email not found"})
    const isMatched = await bcrypt.compare(req.body.password, user.password)
    if(!isMatched) return res.status(400).json({msg: "Invalid password"})
    res.json({
      data: user,
      token: "hdfsaoifadsnbjkflsandfas",
      isLoggedIn: true,
      msg: "logged in successful"
    })
  }

  

module.exports = {getUser,registerNewUser,loginUser}