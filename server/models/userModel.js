var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  var userSchema = new Schema({
    username : {
      type: String,
      trim: true,
      unique: true
    },
    created: {
      type: Date,
      default: Date.now()
    },
    // messages : {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Message'
    // },
    firstName: String,
    lastName: String,
    email: String,
    password: String
  });



module.exports = mongoose.model('User', userSchema);
