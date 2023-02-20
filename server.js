const express = require('express');
const cors = require('cors')

//mongodb mongodb+srv://rhysw97:<password>@cluster0.xsnkawm.mongodb.net/?retryWrites=true&w=majority
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

    //check if username or email is taken
    res.send('register')
})

app.get('/register', (req, res) => {
    res.send('register')
})


app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);