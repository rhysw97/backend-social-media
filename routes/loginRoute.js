const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/', (request, response) => {
    const body = request.body
    waitForLoginDetails(body, response, request);
});

async function waitForLoginDetails(data, response, request) {
    const currentUser = request.app.locals.user 
    const loginData = await currentUser.checkLoginDetails(data);
    //create jwt access token
    


    if(loginData.accepted) {
        const accessToken = jwt.sign({name: currentUser.username}, process.env.JWT_SECRET)

        const refreshToken = jwt.sign({name: currentUser.username}, {expiresIn: '1d'})
        
        request.session.username = loginData.username
        response.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return response.send({
            username: request.session.username,
            loggedin: true,
            accessToken: accessToken, 
        })


    } else {
        response.send({loggedin:false})
    }  

    console.log('name', request.session.username)
}

router.post('/logout', (request, response) => {
    request.session.destroy();
})

router.post('/refresh', (response, request) => {
    if(request.cookies?.jwt) {
        const refreshToken = request.cookies.jwt

        jwt.verify(refreshToken. process.env.REFRESH_TOKEN_SECRET)
    }
})

module.exports = router