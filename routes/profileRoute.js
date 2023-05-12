const express = require("express")
const router = express.Router()

const multer = require('multer')
const upload = multer({dest: 'uploads/'})

router.app('/edit-profile', upload.single('profilePicture'), (request, response) => {
    console.log(request.file)
    let filename=null
    if(request.file && request.file.filename){ //check that a file was passes with a valid name
        filename='uploads/'+request.file.filename
    }
    const data = {
        
    }

})