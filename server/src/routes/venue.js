const { Router } = require("express");
const { getVenue,getVenueById,createNewVenue, updateVenueById,deleteVenueById } = require("../controllers/venue");
const app = Router();

app.get('/venue', getVenue )
app.get('/venue/:id', getVenueById )
app.post('/venue', createNewVenue )
app.put('/venue/:id', updateVenueById )
app.delete('/venue/:id', deleteVenueById )


module.exports = app;


