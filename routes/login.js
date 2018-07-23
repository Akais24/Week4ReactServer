var express = require('express');
var router = express.Router();


var User = require('../models/user')

// // CONNECT TO MONGODB SERVER
// var mongoose    = require('mongoose');
// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function(){
//     // CONNECTED TO MONGODB SERVER
//     console.log("Connected to mongod server");
// });
//
// mongoose.connect('mongodb://localhost/week4');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find(function(err, users){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(users);
  })

  // res.json([{
  // 	id: 1,
  // 	username: "samsepi0l"
  // }, {
  // 	id: 2,
  // 	username: "D0loresH4ze"
  // }]);
});

router.post('/', function(req, res, next) {
  var raw_id = req.body.id;
	var raw_pass = req.body.password;
		console.log(raw_id);
		console.log(raw_pass);
  User.findOne({id:raw_id}, function(err, user){
    if(err) return res.status(500).send({result: 'database failure'});
  	if(!user) return res.status(200).json({result: 'No ID'});
		if(user.password != raw_pass) return res.status(200).json({result: 'Wrong Password'});

		res.json({result: "Success"});
	});
});

module.exports = router;
