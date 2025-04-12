const Event = require('../models/event');

const createEvent = async (req, res) => {
    try {
        const data = await Event.create(req.body)

        return res.status(201).json({msg: "Event Created !!"})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Event creating failed due to server error!"})
    }
}

const myEvents = async (req, res) => {
    try {
        const events = await Event.find({booked_by: req.params.id})
        return res.status(200).json(events)
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Event creating failed due to server error!"})
    }    
}

module.exports = {createEvent, myEvents}