var express = require('express');
var router = express.Router();


var User = require('../models/user')

router.post('/', function(req, res, next) {
  var raw_id = req.body.id;
	var raw_pass = req.body.password;
  User.findOne({id:raw_id}, function(err, user){
    if(err) return res.status(500).send({result: 'database failure'});
  	if(!user) return res.status(200).json({result: 'No ID'});
		if(user.password != raw_pass) return res.status(200).json({result: 'Wrong Password'});

		return res.json({result: "Success", data:user});
	});
});

module.exports = router;
