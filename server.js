const express = require('express');
const cors = require('cors')
const Database = require('./database')
//YGZxR5P9sFV13v8c
const db = new Database.Database("mongodb+srv://rhysw97:7jv51e8bzb4jg0xP@cluster0.jx0jttw.mongodb.net/?retryWrites=true&w=majority")
const app = express();
require("dotenv").config();

app.use(cors())
app.use(express.json())

const port = process.env.port
app.get('/', (req, res) => {
    res.send("hello world")
})
// GET endpoint to retrieve email
app.post('/login', (req, res) => {
    const body = req.body
    console.log(body)
    res.send('login')
});



app.post('/register', (req, res) => {
    const body = req.body
    console.log(body)
    db.addUserToDatabase('gig-mates', 'Users', body)

    //check if username or email is taken
    //if it is send back to the client to display to user
    //if not create new user and send back to client that user has been created and move onto profile set up page 
    //may complete profile set up page later and sort out user post system first //my guys this seems to be going okay at least for now
    res.send('register')
})




app.get('/register', (req, res) => {
    res.send('register')
})


app.listen(port, () =>{
        console.log(`App listening on port ${port}!`)
         db.listDatabases()
      //  db.checkDatabaseForEmail()
    }
    
);

