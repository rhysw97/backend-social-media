const express = require("express")
const router = express.Router()




//app.use('/login', loginRoute )
router.post('/', (request, response) => {
    const body = request.body
    waitForLoginDetails(body, response, request);
});

async function waitForLoginDetails(data, response, request) {
    const currentUser = request.app.locals.user 
    const loginData = await currentUser.checkLoginDetails(data);
    
    if(loginData.accepted) {
        request.session.username = loginData.username
        response.send(true)
    } else {
        response.send(false)
    }  

    console.log('name', request.session.username)
}

router.post('/logout', (request, response) => {
    request.session.destroy();
})

module.exports = router