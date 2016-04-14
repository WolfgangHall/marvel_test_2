var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
    },
    room: {
      type: String,
      trim: true
    }
  });

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;