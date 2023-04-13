const express = require("express")
const router = express.Router()
const {User} = require('./../components/user')
let user = { currentUser : ''}


// GET endpoint to retrieve email
router.post('/', (request, response) => {
    const body = request.body
    waitForLoginDetails(body, response, request);
});

async function waitForLoginDetails(data, response, request) {
    const loginData = await user.currentUser.checkLoginDetails(data);
    
    if(loginData.accepted) {
        request.session.username = loginData.username
        response.send(true)
    } else {
        response.send(false)
    }  

    console.log('name', request.session.username)
}

module.exports = {
    router,
    user
}