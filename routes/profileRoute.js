const express = require("express")
const router = express.Router()
const path = require('path')
const user = request.app.locals.user

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
    about: request.body.bio,
    profilePicture: request.file.filename,
    genres: request.body.genres.split(',')
  }

  console.log('data', data)
  user.updateProfile(data, response)
})
  
  // Start the server.

//route for getting current users profile data 
router.get('/get-profile/:username', (request, response) => {
  if(request.username) {
    user.getProfileData(request.username, response)
  } else {
    user.getProfileData(request.session.username, response)
  }

})

//route for getting a users profile picture (contains url param for name)
router.get('/profile-pic/:username', (request, repsonse) => {
  if(res.username) {
    user.getProfilePicture(res.username, response)
  } else {
    user.getProfilePicture(request.session.username, repsonse)
  }
}), 

module.exports = router