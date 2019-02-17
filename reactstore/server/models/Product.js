var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
  image: {
    type: String
  },
  name: {
      type: String
  },
  price: {
      type: String
  },
  units: {
      type: Number
  }
},{
    collection: 'products'
});

module.exports = mongoose.model('Product', Product);
