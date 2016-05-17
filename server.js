var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

// Body Parser Setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

//allow cors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});



// Setup for Morgan
var logger = require('morgan');
app.use(logger('dev'));

 
// app.use('/', router);
app.use(express.static('client'));



//catchall route
app.get('/*', function(req, res){
  res.sendFile(process.cwd() +'/client/views/index.html');
});

app.listen(port, function(){
  console.log("Magic on Port " + port);
});