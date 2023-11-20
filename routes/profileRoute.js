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
    about: request.body.bio,
    profilePicture: request.file.filename,
    genres: request.body.genres.split(',')
  }

  console.log('data', data)
  request.app.locals.user.updateProfile(data, response)
})
  
  // Start the server.

//route for getting current users profile data 
router.get('/get-profile', (request, response) => {
  if(request.query.username) {
    request.app.locals.user.getProfileData(request.query.username, response)
  } else {
    request.app.locals.user.getProfileData(request.session.username, response)
  }

})

//route for getting a users profile picture (contains url param for name)
router.get('/profile-pic', (request, response) => {
  console.log(request.query.username)
  if(request.query.username) {
    request.app.locals.user.getProfilePicture(request.query.username, response)
  } else {
    request.app.locals.user.getProfilePicture(request.session.username, response)
  }
}), 

module.exports = router































