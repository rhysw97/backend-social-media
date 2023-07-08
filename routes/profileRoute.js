const express = require("express")
const router = express.Router()
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });

/*router.post('/edit', upload.single('profilePicture'), (request, response) => {
    const image = request.body.image
    console.log(request.body)
    console.log('image', request.body)
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
})*/

router.post('/edit', multer({ storage }).single('file'), (request, response) => {
  
    const data = {
      username: request.session.username,
      name: request.body.name,
      bio: request.body.bio,
      profilePicture: request.file.filename,
      genres: request.body.genres.split(',')
    }
    console.log('data', data)
   request.app.locals.user.updateProfile(data, response)
})
  
  // Start the server.

router.get('/get-profile', (request, response)=>{
  request.app.locals.user.getProfileData(request.session.username, response)
})

module.exports = router