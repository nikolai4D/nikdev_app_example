const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require("fs");
const { getAllUsers } = require("./api/users");


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api', require('./api/router.js'));


app.get('*', function(req, res, next) {
    res.sendFile('index.html', { root: 'dist' });
})

module.exports = app;
