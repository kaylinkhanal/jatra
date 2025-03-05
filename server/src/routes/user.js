const { Router } = require("express");
const { getUser,registerNewUser } = require("../controllers/user");
const app = Router();

app.get('/users',getUser )
app.post('/register',registerNewUser )




module.exports = app;


