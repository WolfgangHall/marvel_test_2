var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var db = mongoose.connection;

  db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
  });
  db.once('open', function() {
    console.log('Mongoose connection successful.');
  });


  var UserSchema = new Schema({
    created: {
      type: Date,
      default: Date.now()
    },
    username : {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  });

var User = mongoose.model('User', UserSchema);
module.exports = User;