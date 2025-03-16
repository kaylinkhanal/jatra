const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect  = async ()=>{
    try {
        const res = await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
        if(res) console.log("db connection success")
    }catch(err){
        console.error(err)
    }
}

module.exports = dbConnect