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
function addNewPost(userID, post) {
    let myPost = {
        postedBy: userID,
        message: post.message,
        likes: 0,
        time: Date.now()
    }
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

module.exports = {
    getPosts, 
    addNewPost
}
