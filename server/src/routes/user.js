const { Router } = require("express");
const { getUser,registerNewUser, loginUser } = require("../controllers/user");
const app = Router();

app.get('/users',getUser )
app.post('/register',registerNewUser )
app.post('/login', loginUser )



module.exports = app;


