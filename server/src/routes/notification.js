const { Router } = require("express");
const { getAllNotificatons } = require("../controllers/notification");
const app = Router();

app.get('/notifications',  getAllNotificatons )



module.exports = app;