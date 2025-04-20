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
      const data = await Booking.find({venue: req.params.venueId,status: "Approved"}).populate('event venue')
      return res?.json(data)
    }catch(err){
      return res?.status(500).json({message: err.message})
    }
  }
  
  const createBooking = async(req, res) => {
    const {userId, event,venue, booked_date} = req.body
    try{
      const user = await User.findById(userId)
      sendEmail(
        "kyalin.khanal@gmail.com",
        user.email,
        "Your Booking Request is Under Review",
        "Your booking request has been received and is currently under review.",
        `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #d63384;">🎉 Thank you for your booking request!</h2>
              <p>Hello <strong>${user.fullName}</strong>,</p>
              <p>We’ve received your booking request for an event with <strong>Jatra Event Management</strong>. Our team is currently reviewing the details, and we’ll get back to you shortly with confirmation or further instructions.</p>
              <p>If you have any questions in the meantime, feel free to reply to this email.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 14px; color: #666;">Thanks for choosing Jatra Events.<br />We look forward to creating something amazing with you! ✨</p>
            </div>
          </body>
        </html>
        `
    )
    
      await Booking.create({venue,event, booked_date})
      return res?.json({message: "Booking created successfully"})

    }
    catch(err){
      return res?.status(500).json({message: err.message})
      }
  }
module.exports = { getAllBookings ,createBooking,getBookingsByVenueId}

