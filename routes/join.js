var express = require('express');
var router = express.Router();

var User = require('../models/user')

router.post('/', function(req, res, next) {
  var raw_id = req.body.id;
  var raw_pwd = req.body.password;
  var raw_name = req.body.name;
  var raw_number = req.body.number;
  var raw_addr = req.body.address;
  User.findOne({id:raw_id}, function(err, user){
    if(err) return res.status(500).send({result: 'database failure'});
    if(user) return res.status(200).send({result: 'Existing ID'});

    var user = new User();
    user.id = raw_id;
    user.password = raw_pwd;
    user.name = raw_name;
    user.number = raw_number;
    user.address = raw_addr;

    user.save(function(err){
      if(err){
        console.error(err);
        res.json({result: "Failure"});
        return;
      }
      res.json({result: "Success"});
    });

  });
});

router.post('/modify', function(req, res, next) {
  var raw_id = req.body.id;
  var raw_pwd = req.body.password;
  var raw_name = req.body.name;
  var raw_number = req.body.number;
  var raw_addr = req.body.address;
  User.findOne({id:raw_id}, function(err, user){
    if(err) return res.status(500).send({result: 'database failure'});
    if(!user) return res.status(200).send({result: 'No ID'});

    User.remove({id:raw_id}, function(err, output){
      var user = new User();
      user.id = raw_id;
      user.password = raw_pwd;
      user.name = raw_name;
      user.number = raw_number;
      user.address = raw_addr;

      user.save(function(err){
        if(err){
          console.error(err);
          res.json({result: "Failure"});
          return;
        }
        res.json({result: "Success"});
      });
    });
  });
});


module.exports = router;
