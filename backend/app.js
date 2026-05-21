var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
const cors = require('cors');

var app = express();



// =========================
// AUTH CONFIG
// =========================
require('./auth/auth');



// =========================
// ROUTES IMPORT
// =========================
const login = require('./routes/login');

const loggedInPage = require('./routes/loggedInUser');

const registerRouter = require('./routes/register');

const bookingRoute = require('./routes/routeSelection');



// =========================
// DATABASE CONFIG
// =========================
const DB_URL = require('./config/keys').MongoURI;



// =========================
// CONNECT TO MONGODB
// =========================
mongoose.connect(DB_URL)

.then(() => {

    console.log('Connected to MongoDB');

})

.catch((err) => {

    console.log('MongoDB Error => ', err);

});



// =========================
// MIDDLEWARE
// =========================
app.use(cors());

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);



// =========================
// API ROUTES
// =========================

// LOGIN
app.use('/', login);


// REGISTER
app.use('/register', registerRouter);


// PROTECTED USER ROUTE
app.use(

    '/user',

    passport.authenticate(
        'jwt',
        { session: false }
    ),

    loggedInPage
);


// =========================
// TRANSPORT ROUTES
// =========================

// BUS
// FLIGHT
// TRAIN

app.use('/booking', bookingRoute);



// =========================
// TEST ROUTE
// =========================
app.get('/', (req, res) => {

    res.json({
        status: true,
        message: 'Backend Running Successfully'
    });

});



// =========================
// PORT
// =========================
 



// =========================
module.exports = app;