// main modules import
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

// server variables
const port = process.env.PORT || 8080;
const mongodbUrl = 'mongodb://localhost/newAuth';

/// import the main routes
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const secret = require('./routes/secret');

// init express app
const app = express();

// morgan logger
app.use(morgan('dev'));

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
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/secret', secret);

// error handler middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        msg :err.msg,
        err,
        error: true
    });
});

// start mongodb connect
mongoose.connect(mongodbUrl).then(() => {
    console.log('Connect with mongodb successful');
    app.listen(port, () => console.log('Server is running at port ' + port));
}).catch( err => {
    console.error('Error with connect with mongodb', err);
});
