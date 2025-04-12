const Booking = require('../models/booking')
const User = require('../models/user')
const sendEmail = require('../utils/mail')

  const getAllBookings = async(req, res) => {
    try{
      const data = await Booking.find()
      return res?.json(data)
    }catch(err){
      return res?.status(500).json({message: err.message})
    }
  }


  const getBookingsByVenueId = async(req, res) => {
    try{
      const data = await Booking.find({venue: req.params.venueId})
      return res?.json(data)
    }catch(err){
      return res?.status(500).json({message: err.message})
    }
  }
  
  const createBooking = async(req, res) => {
    const {userId, event,venue, booked_date} = req.body
    try{
      const user = await User.findById(userId)
      sendEmail( "kyalin.khanal@gmail.com",user.email, "Your request is is Review!!", "Your request is is Review!!", "<p>Your request is is Review!!</p>")
      await Booking.create({venue,event, booked_date})
    }
    catch(err){
      return res?.status(500).json({message: err.message})
      }
  }
module.exports = { getAllBookings ,createBooking,getBookingsByVenueId}

