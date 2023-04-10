import express from 'express';
import cors from 'cors'
import {Database} from './database.js';
import session from 'express-session'
//YGZxR5P9sFV13v8c
import {addNewPost, getPosts} from './components/post.js'
import {User} from './components/user.js'

import mongoose from 'mongoose'
const currentUser = new User();

mongoose.connect("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")

const app = express();
import dotenv from "dotenv";
dotenv.config()

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

import cookieParser from 'cookie-parser'
app.use(cookieParser())

app.use((request, res, next) => {
    
    next();
})

const port = process.env.PORT
app.get('/', (request, response) => {
    response.send("Welcome to gig-mates")
})
// GET endpoint to retrieve email
app.post('/login', (request, response) => {
    const body = request.body
    waitForLoginDetails(body, response, request);
});

async function waitForLoginDetails(data, response, request) {
    //const login = await db.checkLoginDetails('gig-mates', 'Users', data);
  
    if(login) {
        request.session.username = login.username
        response.send(true)
    } else {
        response.send(false)
    }  

    console.log('name', request.session.username)
}


app.post('/register', (request, response) => {
    const body = request.body
 
    createUser(response, request, body)
    //check if username or email is taken
    //if it is send back to the client to display to user
    //if not create new user and send back to client that user has been created and move onto profile set up page 
    //may complete profile set up page later and sort out user post system first //my guys this seems to be going okay at least for now
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
    currentUser.logout()
})

app.post('/posts', (request, response) => {
  
    
    data = request.body

    const newPost  = {
        username: request.session.username,
        post: data.post
    };
    addNewPost(newPost)
})

app.get('/recentPosts', (request, response) => {
    const recentPosts = getPosts(3)
  
    response.send(recentPosts)
})

app.listen(port, () =>{
        console.log(`App listening on port ${port}!`)
       
    }
);

