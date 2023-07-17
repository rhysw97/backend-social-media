const express = require("express")
const router = express.Router()
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });

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