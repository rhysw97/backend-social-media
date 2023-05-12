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
        username: request.session.username,
        name: request.body.name,
        bio: request.body.bio,
        profilePicture: request.body.profilePicture.filename,
        genres: request.body.genres
    }

    app.locals.user.updateProfile(data)

})

router.app('/get-profile', (request, response)=>{
    app.locals.user.getProfileData(request.session.username, response)
})



module.exports = router