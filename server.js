const express = require('express');
const cors = require('cors')
const Database = require('./database');
const { restart } = require('nodemon');
const session=require('express-session')
//YGZxR5P9sFV13v8c
const {addNewPost, getPosts} = require('./components/post')

const mongoose=require('mongoose')


mongoose.connect("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")

const db = new Database.Database("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")
//const db = new Database.Database(`mongodb+srv://rhysw97:${process.env.DATABASE_PASSWORD}@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority`)
const app = express();
require("dotenv").config();

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

const cookieParser=require('cookie-parser')
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
    const login = await db.checkLoginDetails('gig-mates', 'Users', data);
  
    if(login) {
        request.session.username = login.username
        response.send(true)
    } else {
        response.send(false)
    }  
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
    const checks = await db.addUserToDatabase('gig-mates', 'Users', data)
  
    if(checks) {
        request.session.username = data.username
    }
    response.send(JSON.stringify(checks))
}

app.post('/logout', (request, response) => {
    request.session.destroy();
})

app.post('/posts', (request, response) => {

    addNewPost(request.session.username, response.body )
    data = request.body

    const newPost  = {
        username: request.session.username,
        post: data
    };

   // db.addDataToDataBase('gig-mates', 'Posts', newPost)
})

app.get('/recentPosts', (request, response) => {
    const recentPosts = getPosts(request.session.username, response.body)
  
    response.send(recentPosts)
})

app.listen(port, () =>{
        console.log(`App listening on port ${port}!`)
        db.listDatabases()
        // db.checkDatabaseForEmail()

    }
);

