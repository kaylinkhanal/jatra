const Booking = require('../models/booking')

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

  const bookVenue = async(req, res) => {
    try{
      const data = await Booking.create(req.body)
      return res?.json(data)
    }catch(err){
      return res?.status(500).json({message: "something went wrong"})
    }
  } 
  

module.exports = { getAllBookings ,getBookingsByVenueId, bookVenue}





