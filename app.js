var express      = require('express'),
    app          = express(),
    mongoose     = require('mongoose'),
    path         = require('path'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    favicon      = require('serve-favicon'),
    debug        = require('debug')('employ_me');

var configDB = require('./config/database.js');

// configuration ===============================================================
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

// Use cute favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

// Configure Passport
var passport = require('passport');
var session  = require('express-session');
// use generic cookie name so not to disclose implementation (key: 'sessionId')
app.use(session( { secret: 'employMeSecret',
                   key: 'sessionId',
                   cookie: { httpOnly: true } // tell browsers to not allow client side script access to the cookie, mitigating XSS
                 } ));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Initialize Passport
var initPassport = require('./config/passport/init');
initPassport(passport);

// security ===================================================================
// remove the X-Powered-By header as this can be useful to an attacker since it will state that we are using Express
app.disable("x-powered-by");

// We want to use csurf, however it is making testing difficult
// enabling CSRF protections
// CSRF middleware ignore verifying tokens on HTTP GET, OPTIONS, and HEAD requests
//var csrf = require('csurf');
//app.use(csrf());
app.use( function(req, res, next) {
  res.locals._csrf = "tokenGoesHere";
  //res.locals._csrf = req.csrfToken();
  next();
});

// using helmet to create a Content Security Policy (CSP)
var helmet = require('helmet');
// app.use(helmet.contentSecurityPolicy({
//   scriptSrc  : ['code.jquery.com', "'self'", 'ajax.googleapis.com'], // note: this does not allow any inline javascript
//   styleSrc   : ["'unsafe-inline'", 'code.jquery.com', "'self'", 'netdna.bootstrapcdn.com'] // allow inline css
// }));
// re-enable the XSS header if it was diabled by the user
app.use(helmet.xssFilter());
// don't allow the app to be used in a frame or iframe
app.use(helmet.frameguard('deny'));

// routes ======================================================================
var index     = require('./app/routes/index')(passport);
var student   = require('./app/routes/students');
var employers = require('./app/routes/employers');
var skills    = require('./app/routes/skills');
var classes   = require('./app/routes/classes');
var profile   = require('./app/routes/profile');
var search    = require('./app/routes/search');
var tests     = require('./app/routes/tests');

app.use('/', index);
app.use('/students', student);
app.use('/employers', employers);
app.use('/skills', skills);
app.use('/classes', classes);
app.use('/profile', profile);
app.use('/search', search);
app.use('/tests', tests);

// launch ======================================================================
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);

var server = app.listen(app.get('port'), process.env.OPENSHIFT_NODEJS_IP, function() {
  debug('Express server listening on port ' + server.address().port);
});


module.exports = app;
