const Venue = require('../models/venue')
const Booking = require('../models/booking')

Booking.insertMany([
  {
    "event": "67f73a3a83811ab31ca924ad",
    "venue": "67da3b33010f99a034e5ab2a",
    "booked_date": "2025-04-11T10:00:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924ae",
    "venue": "67df82ef4ab38c197395f055",
    "booked_date": "2025-04-12T15:30:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924af",
    "venue": "67f73187a884ab375c8de07d",
    "booked_date": "2025-04-13T09:45:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924b0",
    "venue": "67f7326fa884ab375c8de083",
    "booked_date": "2025-04-14T18:00:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924b1",
    "venue": "67f73307a884ab375c8de089",
    "booked_date": "2025-04-15T12:15:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924ad",
    "venue": "67df82ef4ab38c197395f055",
    "booked_date": "2025-04-16T20:30:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924ae",
    "venue": "67f73187a884ab375c8de07d",
    "booked_date": "2025-04-17T11:00:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924af",
    "venue": "67f7326fa884ab375c8de083",
    "booked_date": "2025-04-18T16:45:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924b0",
    "venue": "67f73307a884ab375c8de089",
    "booked_date": "2025-04-19T13:30:00.000Z"
  },
  {
    "event": "67f73a3a83811ab31ca924b1",
    "venue": "67da3b33010f99a034e5ab2a",
    "booked_date": "2025-04-20T08:00:00.000Z"
  },
    {
      "event": "67f73a3a83811ab31ca924ad",
      "venue": "67f73187a884ab375c8de07d",
      "booked_date": "2025-04-21T19:00:00.000Z"
    },
    {
      "event": "67f73a3a83811ab31ca924ae",
      "venue": "67f73307a884ab375c8de089",
      "booked_date": "2025-04-22T14:15:00.000Z"
    },
     {
      "event": "67f73a3a83811ab31ca924af",
      "venue": "67da3b33010f99a034e5ab2a",
      "booked_date": "2025-04-23T10:30:00.000Z"
    },
     {
      "event": "67f73a3a83811ab31ca924b0",
      "venue": "67df82ef4ab38c197395f055",
      "booked_date": "2025-04-24T17:45:00.000Z"
    },
     {
      "event": "67f73a3a83811ab31ca924b1",
      "venue": "67f7326fa884ab375c8de083",
      "booked_date": "2025-04-25T11:00:00.000Z"
    }
])



  const createNewVenue =async (req, res) => {
    try{
      const data = await Venue.create(req.body)
      if(data) return res.json({msg: "Venue Created !!"})
    }catch(err){
      return res.status(500).json({msg: "Venue creating failed due to server error!"})
    }

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





