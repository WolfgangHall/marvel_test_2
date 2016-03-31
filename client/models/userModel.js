var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
      trim: true
    }
  });

var User = mongoose.model('User', UserSchema);
module.exports = User;