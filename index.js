const express = require("express")
const app = express();

app.use(express.json())

const fileUpload = require('express-fileupload')

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

require('dotenv').config();
const port = process.env.PORT;




const {dbConnect} = require('./config/database')
 dbConnect();
const {CloudinaryConnect} = require('./config/cloudinary')
CloudinaryConnect();


const upload = require('./routes/FileUploader')

app.use('/api/v1' , upload)


app.listen(port , (req , res) => {
    console.log(`App running on ${port} No.`)
})