var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var path = require('path');
var logger = require('morgan');

var port = process.env.PORT || 8080;
var multer = require('multer');
var crypto = require('crypto');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+ '/client/uploads/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});
var uploading = multer({ storage: storage });

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

var mongoose = require('mongoose');
// var User = require('./client/models/userModel.js');
var Message = require('./client/models/messageModel.js');
mongoose.connect('mongodb://localhost/userRegistration');

app.use('/', router);
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
      // User.save(function(err){
      // var newUser = new User({username : data.username});
      // newUser.save(function(err){
      //   if (err) throw err;
      //   console.log('user saved to db');
      // });
    } else {
      socket.emit('prompt-username', {
        message : "User already exists"
      });
    }
  });

  socket.on('message', function(data){
    console.log(data);
    io.emit('message', {username: username, message: data.message});

    var newMessage = new Message({message: data.message, username: username, date: Date.now()});
    console.log(newMessage);
    newMessage.save(function(err){
      if (err) throw err;
      console.log('new message saved');
    });
  });

  socket.on('disconnect', function(data){
    console.log(username + ' has disconnected');
    users.splice(users.indexOf(username), 1);
    io.emit('remove-user', {username: username});
  });
});


app.post('/upload', uploading.single('image'), function(req, res) { 
  res.status(204).end(); 
});


http.listen(port, function(){
  console.log("Magic on Port " + port);
});