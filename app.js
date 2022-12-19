const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require("fs");
const bodyParser = require("express");


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/vehicles", (req, res) => {
    console.log("vehicles route")
    const vehiclesFile = JSON.parse(fs.readFileSync('./mockDB/vehicles.json', 'utf8'))
    res.json(vehiclesFile.vehicles)
})


app.post("/login", (req, res) => {
    console.log("login route")

    const userFile = JSON.parse(fs.readFileSync('./mockDB/users.json', 'utf8'))

    const user = userFile.users.find(user => user.name === req.body.username && user.password === req.body.password)

    if(user) res.json({message: "success", user: user})
    else res.json({message: "error", user: null})

})


app.get('*', function(req, res, next) {
    res.sendFile('index.html', { root: 'dist' });
})

module.exports = app;
