const express = require("express")
const router = express.Router()
const {addNewPost, getPosts, likePost, unlikePost, commentOnPost} = require('../components/post')

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
    console.table(request.body)
    likePost(request.body.postId, request.session.username)
})

router.post('/unlikePost', (request, response) => {
    console.table(request.body)
    unlikePost(request.body.postId, request.session.username)
})

async function getRecentPosts(numberOfPosts, response) {
    const recentPosts = await getPosts(numberOfPosts)
  //  console.log('recentPosts', recentPosts)
    response.send(recentPosts)
}

router.post('/comment', (request, response) => {
    console.log(request.body)
    commentOnPost(request.body.id, request.session.username, request.body.content)
})

module.exports = router