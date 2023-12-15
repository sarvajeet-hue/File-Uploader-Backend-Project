const File = require('../models/file')
const cloudinary = require('cloudinary').v2;


exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log(file)

        //where we want to store the file
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split(".")[1]}`;
        console.log(path)

        file.mv(path, (err) => {
            console.log(err)
        })

        res.status(200).json({
            success: true,
            message: "file uploaded Successfully"
        })

    }

    catch (error) {
        res.status(400).json({
            success: false,

        })
    }
}




function isFileSupported(file, supportedFile) {
    return supportedFile.includes(file);
}


async function uploadFileToCloudinary(file , folder , quality) {
    const options = {folder}
    
    options.resource_type = "auto"

    if(quality){
        options.quality = quality;
    }
    console.log(options)
    console.log(file.tempFilePath)
   return await cloudinary.uploader.upload(file.tempFilePath , options)
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, email, tag } = req.body;
        const file = req.files.imageFile;
        console.log(file)

        console.log(req)
        console.log(name )
        console.log(email)
        console.log(tag)


             // validation 

        const supportedFile = ["jpg", "jpeg", "png"]
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType)

       

        if (!isFileSupported(fileType, supportedFile)) {
            return res.status(400).json({
                success: false,
                message: "file format not supported"
            })
        }

        //now upload the file in cloudinary
        const response = await uploadFileToCloudinary(file , "Codehelp")
        console.log(response)

        //db me entry save krni hai 
        const fileData = await File.create({name , email , tag , imageUrl : response.secure_url})

        
         


        res.status(200).json(
            {
                success : true, 
                message : "Image Upload in cloudinary successfully",
                filedata : fileData
            }
        )

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success : false , 
            message : "Image was not uploaded"
        })
    }
} 


exports.videoUploader = async(req , res) =>{
    try {
        const {name , email , tag } = req.body;
        const videoFile = req.files.videoFile;
        console.log(name , email , tag)
        console.log(videoFile)

        //validation 
        const supportedFile = ["mp4" , "mov"]
        const fileType =  videoFile.name.split(".")[1].toLowerCase()
        console.log(fileType)

        if(!isFileSupported(fileType , supportedFile)){
            res.status(400).json({
                success : false,
                message : "Video Format Not Supported"
            })
        }

        const response = await uploadFileToCloudinary(videoFile , "Codehelp")

        console.log(response);

        const fileData = await File.create({name , email , tag , imageUrl: response.secure_url })
        res.status(200).json({
            success : true,
            message : "Video Uploaded Successfully",
            videoUrl : response.secure_url
        })



    }
    catch(error){
        console.log(error)
        res.status(400).json({
            success : false , 
            message : "Video Not uploaded"
        })
    }
}


exports.compressImageUploader = async (req , res ) => {

    try {

        const { name, email, tag } = req.body;
        const file = req.files.imageFile;

        console.log(name )
        console.log(email)
        console.log(tag)


             // validation 

        const supportedFile = ["jpg", "jpeg", "png"]
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType)

       

        if (!isFileSupported(fileType, supportedFile)) {
            return res.status(400).json({
                success: false,
                message: "file format not supported"
            })
        }

        //now upload the file in cloudinary
        const response = await uploadFileToCloudinary(file , "Codehelp" , 30)
        console.log(response)

        //db me entry save krni hai 
        const fileData = await File.create({name , email , tag , imageUrl : response.secure_url})

        
         


        res.status(200).json(
            {
                success : true, 
                message : "Image Upload in cloudinary successfully",
                filedata : fileData
            }
        )

    }

    catch(error){
        console.log(error)
        res.status(400).json({
            success : false , 
            message : "COmpress file  Not uploaded"
        })
    }
}