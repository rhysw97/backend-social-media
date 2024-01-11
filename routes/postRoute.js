const express = require("express")
const router = express.Router()
const {addNewPost, getPosts, likePost, unlikePost, commentOnPost, viewComments, editPost, deletePost, addNewEventPost, getEventPosts} = require('../components/post')
const { get } = require("mongoose")

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

router.post('/eventPosts', (request, response) => {
    console.log(request.body.id)
   getRecentEventPosts(5 , request.body.id, response)
})

router.post('/createEventPost', (request) => {
    const data = request.body

    const newPost  = {
        username: request.session.username,
        post: data.post,
        eventId: data.id
    };
   addNewEventPost(newPost)
})

router.post('/likePost', (request, response) => {
    likePost(request.body.postId, request.session.username)
})

router.post('/unlikePost', (request, response) => {
    unlikePost(request.body.postId, request.session.username)
})

router.post('/updatePost', (request, response) => {
    console.log(request.body)
    editPost(request.body.postId, request.body.content, request.session.username, response)
})

router.delete('/deletePost', (request, response) => {
    const postID = request.headers.postid
    deletePost(postID, request.session.username, response)
})

async function getRecentPosts(numberOfPosts, response) {
    const recentPosts = await getPosts(numberOfPosts)
  //  console.log('recentPosts', recentPosts)
    response.send(recentPosts)
}

async function getRecentEventPosts(numberOfPosts, eventId, response) {
    const recentEventPosts = await getEventPosts(numberOfPosts, eventId)
    response.send(recentEventPosts)
}

router.post('/comment', (request, response) => {
    console.log('NEW Comment',request.body)
    console.log('name', request.session.username)
    commentOnPost(request.body.postId, request.session.username, request.body.content, request)
})

router.post('/viewComments', async (request, response) => {
    console.log(request.body)
    const comments = await viewComments(request.body.postId)
    console.log('comments', comments)
    response.send(comments)
})

module.exports = router