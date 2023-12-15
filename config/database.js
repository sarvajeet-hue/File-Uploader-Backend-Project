const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser : true, 
        useUnifiedTopology : true
    }).then(() => {
        console.log("db connection Successfully")
    }).catch((error) => {
        console.log(error)
        console.log("db connection Unsuccessfully")
        process.exit(1);
    })
}