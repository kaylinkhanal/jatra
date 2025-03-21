const Venue = require('../models/venue')

  const createNewVenue =async (req, res) => {
    const data = await Venue.create(req.body)
    if(data) return res.json({msg: "Venue Created !!"})
  }

  const getVenue = async(req, res) => {
    const data = await Venue.find()
    return res?.json(data)
  }


  

  const getVenueById = async(req, res) => {
    const data = await Venue.findById(req.params.id)
    return res?.json(data)
  }

  const updateVenueById = async (req, res) => {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body)
   return res.json({msg: "Updated Venue"})
  }

  const deleteVenueById = async (req, res) => {
    const venue = await Venue.findByIdAndDelete(req.params.id)
   return res.json({msg: "Venue Deleted Successfully"})
  }


module.exports = { getVenue, getVenueById, createNewVenue, updateVenueById,deleteVenueById }





