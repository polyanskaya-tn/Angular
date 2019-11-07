var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url, { useMongoClient: true }, function(err, database){
    if(err){
        console.log('Error: '+err);
    }else{
    	console.log('OK');
    }
}); 
mongoose.connection.on('error', function(err) {
  console.log('ERROR: '+ err);
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
	console.log('Main');
  res.send('Server is running');
});

require('./app/routes')(app);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});



