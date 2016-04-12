var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var path = require('path');
var bcrypt = require('bcryptjs');

// var cookieParser = require('cookie-parser');

// Body Parser Setup
var bodyParser = require('body-parser');
app.use(bodyParser.json());


var port = process.env.PORT || 8080;

// var expressSession = require('express-session');
// var passport = require('passport');
// var routes = require('./routes/index')(passport);

// Database Setup
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userRegistration');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var User = require('./server/models/userModel.js');
var Message = require('./server/models/messageModel.js');


//Requriements for Picture Upload
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

// app.use(bodyParser.urlencoded({extended:false}));
// app.use(expressSession({
//     secret: 'quackbird noodletown',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());



//change the object used to authenticate to a smaller token, and protects the server from attacks
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });



// Setup for Morgan
var logger = require('morgan');
app.use(logger('dev'));


// app.use('/', router);
app.use(express.static('client'));


var users = [];

app.get('/*', function(req, res){
  res.sendFile(process.cwd() +'/client/views/index.html');
});

app.post('/users/register', function(req, res){

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      var user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username
      });

      user.save(function(err){
        if (err) res.send(err);

        return res.send();
      })
    })
  })
})

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

// app.post('/register', function(req, res, next){
//   var newUser = new User(req.body);
//   newUser.save(function(err, newUser){
//     if (err){
//       console.log(err);
//       res.send(err);
//     } else {
//       // console.log('trying to save');
//       console.log(newUser);
//       res.send(newUser);
//     }
//   });
// });

// app.post('/login', function(req, res, next){
//   User.findOne({
//     "email": req.body.email
//   }).exec(function(err,user){
//     if (err) {
//       res.send(err);
//     }
//     if(!user){
//       console.log('no user found');
//     } else {
//       if (user.password === req.body.password){
//         console.log('welcome, user');
//     } else {
//       console.log ('creds dont work');
//     }
//     console.log(user);
//     res.send(user);
//     }
//   });
// });

// app.post('/login', function(req, res){
//   User.findOne({ email: req.body.email }, function(err, user){
//     if(err) throw err;

    
//     if(!user){
//       console.log('user does not exist');
//       res.send(err);
//       }else{
//       console.log('user exists');
//       console.log(user);
//       console.log(user.password);
//       console.log(req.body.password);
//       if(user.password === req.body.password){
//         console.log('welcome');
//       }else{
//         console.log('Credentials do not work.');
//         res.send(err);
//       }
//     }
//   });
// });




http.listen(port, function(){
  console.log("Magic on Port " + port);
});