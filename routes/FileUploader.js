const express = require('express')
const router = express.Router();

const {localFileUpload , imageUpload , videoUploader , compressImageUploader} = require('../controllers/fileupload')

// router.post('/imageupload' , imageUpload) 
// router.post('/videoupload' , videoUpload) 
// router.post('/imagereducerupload' , imageReducerUpload) 
router.post('/localfileupload' , localFileUpload) 
router.post('/imageupload' , imageUpload)
router.post('/videoupload' , videoUploader)
router.post('/compressupload' , compressImageUploader)




module.exports = router;