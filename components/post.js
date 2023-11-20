//view recent posts
const Mongoose = require('mongoose')
const {Schema, model} = Mongoose

//creates new schema for posts to set out the data we want to store and what type it will be
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
        }
    ]
})

//creates a model of the post Schema and calls it posts
const Post = model('Posts', postSchema)

async function addNewPost(postData) {
   // const pic = await request.app.locals.user.returnProfilePicture(postData.username)
    let myPost = {
        postedBy: postData.username,
        message: postData.post,
        likes: 0,
        time: Date.now(),
        likedBy: [],
       // profilePicture: pic,
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
    console.log("COMMENT!!!!!!")
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
