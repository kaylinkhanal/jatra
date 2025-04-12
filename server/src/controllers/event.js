const Event = require('../models/event')


  const getAllEvents = async(req, res) => {
    try{
      const data = await Event.find()
      return res?.json(data)
    }catch(err){
      return res?.status(500).json({message: err.message})
    }
  }


  const getEventsOfAUser = async(req, res) => {
    try{
      const data = await Event.find({booked_by: req.params.userId})
      return res?.json(data)
    }catch(err){
      return res?.status(500).json({message: err.message})
    }
  }
  




module.exports = {getAllEvents,getEventsOfAUser }





