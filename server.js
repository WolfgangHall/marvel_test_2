var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var logger = require('morgan');

var port = process.env.PORT || 8080;

app.use(logger('dev'));

app.use(express.static('client'));


var users = [];


io.on('connection', function(socket){
  var username = [];
  console.log('a user has connected');

  socket.on('request-users', function(){
    socket.emit('users', {users: users});
  });

  socket.on('add-user', function(data){
    if(users.indexOf(data.username) == -1){
      io.emit('add-user', {
        username: data.username
      });
      username: data.username;
      users.push(data.username);
    } else {
      socket.emit('prompt-username', {
        message : "User already exists"
      })
    }
  });

  socket.on('message', function(){
    io.emit('message', {username: username, message: data.message});
  });

  socket.on('disconnect', function(){
    console.log(username + ' has disconnected');
    users.splice(users.indexOf(username), 1);
    io.emit('remove-user', {username: username});
  });
});


app.get('*', function(req, res){
  res.sendFile(process.cwd() +'/client/views/index.html');
});

http.listen(port, function(){
  console.log("Magic on Port " + port);
});