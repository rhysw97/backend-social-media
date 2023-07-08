const express = require('express');
const cors = require('cors')
const session = require('express-session')
const path = require('path')
//YGZxR5P9sFV13v8c
const {addNewPost, getPosts} = require('./components/post.js')
const {User} = require('./components/user.js')
const multer = require('multer')

const mongoose = require('mongoose')
const currentUser = new User()

mongoose.connect("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")

const app = express();
const dotenv = require("dotenv");
dotenv.config()

app.locals.user = currentUser;
//import routes
const loginRoute = require('./routes/loginRoute')
const postRoute = require('./routes/postRoute')
const registerRoute = require('./routes/registerRoute')
//const {userRoute} = require('./routes/userRoute')
const profileRoute = require('./routes/profileRoute')
//cors set up to allow front end access
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}))

app.use(express.json())
//user sessions 
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.SESSION_MAX_AGE)
    },
}))

//set up cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use((request, response, next) => {
    next();
})

app.use(express.static(path.join(__dirname, 'uploads')))

//calling routes

app.use('/posts', postRoute)
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/profile', profileRoute)
//app.use('/user', userRoute)*/



const port = process.env.PORT
app.get('/', (request, response) => {
    response.send("Welcome to gig-mates")
})

app.listen(port, () =>{
        console.log(`App listening on port ${port}!`)
    }
);


