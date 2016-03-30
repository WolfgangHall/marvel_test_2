var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var logger = require('morgan');

var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

var mongoose = require('mongoose');
var Message = require('./client/models/userModel.js');
mongoose.connect('mongodb://localhost/userRegistration');

app.use(logger('dev'));

app.use(express.static('client'));


var users = [];

app.get('*', function(req, res){
  res.sendFile(process.cwd() +'/client/views/index.html');
});

io.on('connection', function(socket){
  var username = '';
  console.log('a user has connected');

  socket.on('request-users', function(){
    socket.emit('users', {users: users});
  });

  socket.on('add-user', function(data){
    if(users.indexOf(data.username) == -1){
      io.emit('add-user', {
        username: data.username
      });
      username = data.username;
      users.push(data.username);
    } else {
      socket.emit('prompt-username', {
        message : "User already exists"
      })
    }
  });

  socket.on('message', function(data){
    console.log(data);
    io.emit('message', {username: username, message: data.message});
    console.log(data.message);
    console.log(username);
  });

  socket.on('disconnect', function(data){
    console.log(username + ' has disconnected');
    users.splice(users.indexOf(username), 1);
    io.emit('remove-user', {username: username});
  });
});




http.listen(port, function(){
  console.log("Magic on Port " + port);
});