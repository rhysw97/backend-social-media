//view recent posts
import Mongoose from 'mongoose'
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
   // console.log(data)
    return data;
}

export {
    getPosts, 
    addNewPost
}
