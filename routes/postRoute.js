const express = require("express")
const router = express.Router()
const {addNewPost, getPosts} = require('../components/posts/post')

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

router.post('/addLikesToPost', (request, response) => {
   updateLikes(request.body)
    
})

async function getRecentPosts(numberOfPosts, response) {
    const recentPosts = await getPosts(numberOfPosts)
  //  console.log('recentPosts', recentPosts)
    response.send(recentPosts)
}

module.exports = router