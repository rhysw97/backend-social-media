const express = require('express');

const app = express();
require("dotenv").config();
const port = process.env.port
app.get('/', (req, res) => {
    res.send("hello world")
})
// GET endpoint to retrieve email
app.get('/login', (req, res) => {
    res.send('login')
    console.log(`request: ${req}`)
    console.log(`response: ${res}`)
});

app.get('/register', (req, res) => {
    res.send('register')
})


app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);