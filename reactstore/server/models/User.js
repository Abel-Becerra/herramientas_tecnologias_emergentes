var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  user: {
    type: String
  },
  password: {
      type: String
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);
