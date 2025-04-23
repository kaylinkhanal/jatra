const { Router } = require("express");
const { getAllEvents,getEventsOfAUser, createEvent } = require("../controllers/event");
const app = Router();

app.get('/events',  getAllEvents )
app.get('/events/:userId',  getEventsOfAUser )
app.post('/events', createEvent)



module.exports = app;


