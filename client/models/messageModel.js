var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var db = mongoose.connection;

  db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
  });
  db.once('open', function() {
    console.log('Mongoose connection successful.');
  });

  var MessageSchema = new Schema({
    created: {
      type: Date,
      default: Date.now()
    },
    message : {
      type: String,
      trim: true
    },
    username: {
      type: String,
      trim: true
    }
  });

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;