// config/database.js

var connection_string = 'localhost:27017/EmployTest';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/EmployTest';
}

module.exports = {
  // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
	'url' : 'mongodb://' + connection_string
};
