const mongoose = require('mongoose');
const config = require('./server/database/DB');
const ObjectID = require('mongodb').ObjectID;

mongoose.connect(config.DB, { useNewUrlParser: true }, function(err, db){
  if(err) throw err;

  arr = [{_id:new ObjectID("5c579c10e7179a1c1790a449"), units:500},{_id:new ObjectID("5c579c1ae7179a1c1790a44a"), units:1300}]
  db.collection('products').updateOne(
    { _id: new ObjectID("5c579c10e7179a1c1790a449") },
    {},
    { $set: { arr } },
    function(err, object) {
        if (err){
            console.warn(err.message);
        }else{
            console.dir(object);
        }
    });
});
