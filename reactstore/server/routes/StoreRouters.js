const express = require('express');
const app = express();
const ServerRouter = express.Router();
const ObjectID = require('mongodb').ObjectID;

const User = require('../models/User');
const Product = require('../models/Product');

ServerRouter.route('/').post(function (req, res) {
  User.findOne({user:req.body.user, password:req.body.password}, function (err, usr){
    if(err){
      console.log(err);
      res.json("invalido")
    }
    else {
      if (usr === null || usr === undefined){
        res.json("invalido")
      }else{
        res.json("valido")
      }
    }
  });
});

ServerRouter.route('/productos').get(function (req, res) {
  Product.find(function (err, pro){
    if(err){
      console.log(err);
      res.json(new Array())
    }
    else {
      res.json(pro)
    }
  });
});

ServerRouter.route('/pagar').post(function (req, res) {
  console.log({ _id:new ObjectID(req.body._id), units:req.body.units, name: req.body.name })
  Product.findOneAndUpdate(
    { _id: new ObjectID(req.body._id) },
    { units:req.body.units },
    function(err, object) {
        if (err){
            console.warn(err.message);
            res.json("{exito:false, msg:" + err.message + ", name: " + req.body.name + "}")
        } else {
            console.dir(object);
            res.json("{exito:true}")
        }
    });
});

module.exports = ServerRouter;
