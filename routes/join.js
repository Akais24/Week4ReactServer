var express = require('express');
var router = express.Router();

var User = require('../models/user')

router.post('/', function(req, res, next) {
  var raw_id = req.body.id;
  User.find({id:raw_id}, function(err, users){
    if(err) return res.status(500).send({error: 'database failure'});
    if(users.length === 0){
      var user = new User();
      user.id = raw_id;
      user.password = req.body.password;

      user.save(function(err){
        if(err){
          console.error(err);
          res.json({result: "Failure"});
          return;
        }
        res.json({result: "Success"});
      })
    }else{
      res.json({result: "Exist ID"});
    }
  });
});

module.exports = router;
