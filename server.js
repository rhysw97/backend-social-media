const express = require('express');
const cors = require('cors')

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

app.get('/register', (req, res) => {
    res.send('register')
})


app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);