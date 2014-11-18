var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var configDB = require('./config/database.js');

// configuration ===============================================================
console.log(configDB.url);
mongoose.connect(configDB.url); // connect to our database

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Using the flash middleware provided by connect-flash to store messages
// in session and displaying in templates
var flash = require('connect-flash');
app.use(flash()); // use connect-flash for flash messages stored in session

// Configure Passport
var passport = require('passport');
var session  = require('express-session');
app.use(session({ secret: 'employMeSecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Initialize Passport
var initPassport = require('./config/passport/init');
initPassport(passport);

// routes ======================================================================
var index   = require('./app/routes/index')(passport);
var student = require('./app/routes/students');
var skills  = require('./app/routes/skills');
var classes = require('./app/routes/classes');

app.use('/', index);
app.use('/students', student);
app.use('/skills', skills);
app.use('/classes', classes);

// launch ======================================================================
module.exports = app;
