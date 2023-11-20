const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")

const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token

    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshTokens)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
    res.json({accessToken: accessToken})
    })
})

app.post('/login', (request, response) => {
    //Authenicate User
    const body = request.body
    waitForLoginDetails(body, response)

})

async function waitForLoginDetails(data, response) {
    const loginData = await checkLoginDetails(data);

    if(loginData.accepted) {
        const accessToken = generateAccessToken(loginData.username)

        const refreshToken = jwt.sign({name: loginData.username}, process.env.REFRESH_TOKEN_SECRET)
        
        return response.send({
            username: request.session.username,
            loggedin: true,
            accessToken: accessToken, 
            refreshToken: refreshToken,
        })


    } else {
        response.send({loggedin:false})
    }  
}

async function checkLoginDetails(data) {
    const userData = await mongoose.connection.db.collection('Users', (err, collection) => {
        console.log(collection.findOne({email: data.email}))
    })
    console.log(userData)
    if(userData) {
        if(userData.password === data.password) {
            return {accepted: true, username: userData.username}
        }
    }
    return {accepted: false, username: ''}
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}

app.listen(4000)
