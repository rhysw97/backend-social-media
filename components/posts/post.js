//view recent posts
const Mongoose = require('mongoose')
const {Schema, model} = Mongoose

const postSchema=new Schema({
    postedBy: String,
    message: String,
    likes: Number,
    time: Date,
    tags: [String],
    comments: [
        {
            commentBy: String,
            comment: String,
            time: Date
        }
    ]
})

const Post = model('Posts', postSchema)
function addNewPost(postData) {
    let myPost = {
        postedBy: postData.username,
        message: postData.post,
        likes: 0,
        time: Date.now()
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
    await Post.findByIdAndUpdate(likedPostID,{$inc: {likes: 1}}).exec()
        .then(foundData=>found=foundData)
}

async function commentOnPost(commentedPostID, commentByUser, comment){
    let newComment={
        user: commentByUser,
        message: comment,
        likes: 0
    }
    await Post.findByIdAndUpdate(commentedPostID,{$push: {comments: newComment}}).exec()
        .then(foundData=>found=foundData)
}

module.exports = {
    addNewPost,
    getPosts,
    getPost,
    likePost,
    commentOnPost
}
