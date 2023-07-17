//view recent posts
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
            commentBy: String,
            message: String,
            time: Date,
            likes: Number,
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
    console.log('post',likedPostID,likedByUser)
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
    console.log('post',likedPostID,likedByUser)
    await Post.findByIdAndUpdate(likedPostID, {
        $inc:{likes: -1},
        $pull:{likedBy: likedByUser}
    }).exec()
        .then(foundData=>{
            
            found=foundData
            console.log(found)
        })
}

async function commentOnPost(commentedPostID, commentByUser, comment){
    let found;
    console.log(commentByUser)
    let newComment={
        user: commentByUser,
        message: comment,
        likes: 0,
        time: Date.now()
    }
    
    await Post.findByIdAndUpdate(commentedPostID,{$push: {comments: newComment}}).exec()
        .then(foundData=>found=foundData)
}

async function viewComments(postid){
    let data=null;
    console.log('postid', postid)
    await Post.findById(postid)
        .exec()
        .then(mongoData=>{
            data=mongoData;
        })
        .catch(err=>{
            console.log('Error:'+err)
        });
    console.log('yo', data);
    return data;
}

module.exports = {
    addNewPost,
    getPosts,
    getPost,
    likePost,
    unlikePost,
    commentOnPost,
    viewComments
}
