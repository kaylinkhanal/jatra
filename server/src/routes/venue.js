const { Router } = require("express");
const { getVenue,getVenueById,createNewVenue, updateVenueById,deleteVenueById } = require("../controllers/venue");
const  jwt = require('jsonwebtoken');
const app = Router();

// const validateToken =async (req,res,next) => {
//     try{
//        const isVerifed = await jwt.verify(req.headers?.authorization?.split(' ')?.[1], process.env.SECRET_KEY )
//        if(isVerifed) next()
      
//     }catch(err){
//         console.log(err)
//         res.status(401).json({msg: "Un authorized!"})
//     }
// }
app.get('/venue',  getVenue )
app.get('/venue/:id', getVenueById )
app.post('/venue', createNewVenue )
app.put('/venue/:id', updateVenueById )
app.delete('/venue/:id', deleteVenueById )


module.exports = app;


