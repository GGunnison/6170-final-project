// main.js is compiled with Browserify through the gulp build system to public/src
// this allows us to use node modules on the front end and do client side templiting with jadeify
// author: sabrina
// TODO split up Browserify build to have multiple entires so that we can require the javascript files in their appropriate views
SearchResultsController = require('./searchResultsController');
IndexController  = require('./indexController');
SignupController = require('./signupController');
