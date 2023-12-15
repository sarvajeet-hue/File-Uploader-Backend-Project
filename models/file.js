const mongoose = require('mongoose')
const nodemailer = require("nodemailer")
require('dotenv').config();


const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    } , 
    imageUrl : {
        type : String,
        required : true
    },
    email : {
        type : String , 
        
    }, 
    tag : {
        type : String
    }, 

})

//POST middleware

fileSchema.post('save' , async function(doc){
    try{
        console.log(doc)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            host : process.env.MAIL_HOST,
            auth : {
                user: process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

        
        
        let info = await transporter.sendMail({
            from : "krishna", 
            to : doc.email,
            subject : "new file uploaded on cloundinary",
            html : `<h1>Hello ji </h1> `
        })

        console.log( "info -->",info)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = mongoose.model('File' , fileSchema)