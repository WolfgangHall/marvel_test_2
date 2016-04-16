var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  var userSchema = new Schema({
    username : {
      type: String,
      trim: true,
      unique: true,
      min: 4,
      max: 12
    },
    created: {
      type: Date,
      default: Date.now()
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      trim: true,
      min: 5,
      max: 13
    }
  });



module.exports = mongoose.model('User', userSchema);
