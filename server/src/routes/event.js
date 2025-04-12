const { Router } = require("express");
const { getAllEvents,getEventsOfAUser } = require("../controllers/event");
const app = Router();

app.get('/events',  getAllEvents )
app.get('/events/:userId',  getEventsOfAUser )



module.exports = app;


