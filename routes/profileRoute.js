const express = require("express")
const router = express.Router()

const multer = require('multer')
const upload = multer({dest: 'uploads/'})

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

router.post('/edit', upload.single('profilePicture'), (request, response) => {
    console.log(request.body)
  
    const data = {
      username: request.session.username,
      name: request.body.name,
      bio: request.body.bio,
      profilePicture: '',
      genres: request.body.genres
    }
  
    app.locals.user.updateProfile(data)
  })

router.get('/get-profile', (request, response)=>{
    console.log('request')
    app.locals.user.getProfileData(request.session.username, response)
})

router.get('/' , (request, response) => {
    response.send('hi')
})


module.exports = router