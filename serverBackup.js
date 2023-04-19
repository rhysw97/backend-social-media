const express = require('express');
const cors = require('cors')
const session = require('express-session')
//YGZxR5P9sFV13v8c
const {addNewPost, getPosts} = require('./components/post.js')
const {User} = require('./components/user.js')

const mongoose = require('mongoose')
const currentUser = new User();

mongoose.connect("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")

const app = express();
const dotenv = require("dotenv");
dotenv.config()


//import routes
const {loginRoute, user} = require('./routes/loginRoute.js')

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}))

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_MAX_AGE)
    },
}))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use((request, response, next) => {
    next();
})



const port = process.env.PORT
app.get('/', (request, response) => {
    response.send("Welcome to gig-mates")
})

//call routes
user.currentUser = currentUser
//app.use('/login', loginRoute )
app.post('/login', (request, response) => {
    const body = request.body
    waitForLoginDetails(body, response, request);
});

async function waitForLoginDetails(data, response, request) {
    const loginData = await currentUser.checkLoginDetails(data);
    
    if(loginData.accepted) {
        request.session.username = loginData.username
        response.send(true)
    } else {
        response.send(false)
    }  

    console.log('name', request.session.username)
}


app.post('/register', (request, response) => {
    const body = request.body
 
    createUser(response, request, body)
})

async function createUser(response, request, data) {
    const checks = await currentUser.addNewUser(data)
    console.log(checks)
    if(checks) {
        request.session.username = data.username
    }
    response.send(JSON.stringify(checks))
}

app.post('/logout', (request, response) => {
    request.session.destroy();
})

app.post('/posts', (request, response) => {
    const data = request.body

    const newPost  = {
        username: request.session.username,
        post: data.post
    };
   addNewPost(newPost)
})

app.get('/recentPosts', (request, response) => {
    getRecentPosts(5, response)
    
})

async function getRecentPosts(numberOfPosts, response) {
    const recentPosts = await getPosts(numberOfPosts)
    console.log('recentPosts', recentPosts)
    response.send(recentPosts)
}

app.listen(port, () =>{
        console.log(`App listening on port ${port}!`)
    }
);


