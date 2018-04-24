// main modules import
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const port = process.env.PORT || 8080;

// init express app
const app = express();

// init passport
app.use(passport.initialize());
app.use(passport.session());

// set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// public files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

// set the routes
app.use('', );
app.use('login', );
app.use('register', );
