//view recent posts
const { appendFile } = require('fs')
const { request } = require('http')
const Mongoose = require('mongoose')
const {Schema, model} = Mongoose

const postSchema=new Schema({
    postedBy: String,
    message: String,
    likes: Number,
    time: Date,
    likedBy: [String],
    tags: [String],
    comments: [
        {
            user: String,
            commentBy: String,
            message: String,
            time: Date,
            likes: Number,
            profilePicture: String,
            likedBy: [String],
        }
    ]
})

const Post = model('Posts', postSchema)
function addNewPost(postData) {
    let myPost = {
        postedBy: postData.username,
        message: postData.post,
        likes: 0,
        time: Date.now(),
        likedBy: [],
        comments: []
    }

    console.log(myPost)
    Post.create(myPost)
        .catch(err=>{
            console.log("Error: "+err)
        })
}

async function getPosts(n=3) {
    let data = []
    await Post.find({})
        .sort({'time': -1})
        .limit(n)
        .exec()
        .then(mongoData=>{
            data=mongoData;
        })
        .catch(err => {
            console.log('Error:' + err)
        })
    return data;
}

async function getPost(postid){
    let data=null;
    await Post.findById(postid)
        .exec()
        .then(mongoData=>{
            data=mongoData;
        })
        .catch(err=>{
            console.log('Error:'+err)
        });
    return data;
}

async function likePost(likedPostID, likedByUser){
    await Post.findByIdAndUpdate(likedPostID, {
        $inc:{likes: 1},
        $push:{likedBy: likedByUser}
    }).exec()
        .then(foundData=>{
            
            found=foundData
            console.log(found)
        })
}

async function unlikePost(likedPostID, likedByUser){
    await Post.findByIdAndUpdate(likedPostID, {
        $inc:{likes: -1},
        $pull:{likedBy: likedByUser}
    }).exec()
        .then(foundData=>{
            
            found=foundData
            console.log(found)
        })
}

async function commentOnPost(commentedPostID, commentByUser, comment, request){
    console.log("COMMENT!!!!!!")
    let found;
    const pic = await request.app.locals.user.returnProfilePicture(commentByUser)
    console.log('Me', pic)
    let newComment={
        user: commentByUser,
        message: comment,
        likes: 0,
        time: Date.now(),
        profilePicture: pic,
    }

    await Post.findByIdAndUpdate(commentedPostID,{$push: {comments: newComment}}).exec()
        .then(foundData=>found=foundData)
}

async function viewComments(postId){
    let data=null;
    console.log('postid', postId)
    await Post.findById(postId)
        .exec()
        .then(mongoData=>{
            data=mongoData;
        })
        .catch(err=>{
            console.log('Error:'+err)
        });
    return data;
}

async function editPost(postId, content, currentUser, response) { 
    if(await checkUserIsPoster(postId, currentUser)) {
        await Post.findByIdAndUpdate(postId, {content: content}, (err, docs) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log("updated post: ", docs)
            }
        })
        .then(data=> {
            console.log(data)
            //do stuff in here
        })
    } else {
        response.sendStatus(403)
    }   
}

//function to check that a user 
async function checkUserIsPoster(postId, currentUser) {
    let result 
    let data
    await Post.findById(postId)
        .exec()
        .then(mongoData=>{
            data=mongoData;
            console.log(data.postedBy)
            result = data.postedBy === currentUser? true : false
            console.log('Result', result)
            
        })
        .catch(err=>{
            console.log('Error:'+err)
            result = 400
        });
    return result
}

async function deletePost(postId, currentUser, response) {
    const isUserPoster = await checkUserIsPoster(postId, currentUser) 
    if(isUserPoster === true) {
        await Post.findByIdAndDelete(postId)
    } else if (isUserPoster === false) {
        response.sendStatus(403)
    } else {
        response.sendStatus(isUserPoster)
    }
}

module.exports = {
    addNewPost,
    getPosts,
    getPost,
    likePost,
    unlikePost,
    commentOnPost,
    viewComments,
    editPost,
    deletePost
}