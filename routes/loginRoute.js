const express = require("express")
const router = express.Router()

//app.use('/login', loginRoute )
router.post('/', (request, response) => {
    const body = request.body
    waitForLoginDetails(body, response, request);
});

//waits for login details and checks they have been accepted. Sends True or false back to user
async function waitForLoginDetails(data, response, request) {
    const currentUser = request.app.locals.user 
    const loginData = await currentUser.checkLoginDetails(data);
    
    if(loginData.accepted) {
        request.session.username = loginData.username
        response.send({
            username: request.session.username,
            loggedin: true
        })
    } else {
        response.send({loggedin:false})
    }  
}

router.post('/logout', (request, response) => {
    request.session.destroy();
})

module.exports = router