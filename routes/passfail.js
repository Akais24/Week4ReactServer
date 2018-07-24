var express = require('express');
var router = express.Router();

var Passlist = require('../models/passlist')

router.get('/:id', function(req, res, next) {
  var raw_id = req.params.id;
  console.log(raw_id);
  Passlist.findOne({id:raw_id}, function(err, passlist){
    console.log(passlist);
    if(err) return res.status(500).send({result: 'database failure'});
  	if(!passlist || passlist === null) return res.json({result: 'Failure'});
    else return res.json({result: 'Success'});
  });
});

module.exports = router;
