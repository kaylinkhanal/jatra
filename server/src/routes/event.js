const { Router } = require("express");
const { createEvent, myEvents } = require("../controllers/event");
const app = Router();

app.post('/event', createEvent )
app.get('/event/:id', myEvents )




module.exports = app;
