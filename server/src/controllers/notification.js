const Booking = require("../models/booking")

const getAllNotificatons = async (req, res) => {
    try {
        const notification = await Booking.find({status: "Pending"}).populate('event venue')
        return res.json(notification)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

module.exports = {getAllNotificatons}