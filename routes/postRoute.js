const express = require("express")
const router = express.Router()
const {addNewPost, getPosts, likePost} = require('../components/post')

router.post('/', (request, response) => {
    const data = request.body

    const newPost  = {
        username: request.session.username,
        post: data.post
    };
   addNewPost(newPost)
})

router.get('/recentPosts', (request, response) => {
    getRecentPosts(5, response)
    
})

router.post('/likePost', (request, response) => {
   console.log(request.body)
    likePost(request.body.postId, request.session.username)
})

async function getRecentPosts(numberOfPosts, response) {
    const recentPosts = await getPosts(numberOfPosts)
  //  console.log('recentPosts', recentPosts)
    response.send(recentPosts)
}

module.exports = router