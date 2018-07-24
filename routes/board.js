var express = require('express');
var router = express.Router();

var Post = require('../models/post')


router.get('/', function(req, res, next) {
  Post.find(function(err, posts){
    if(err) return res.status(500).send({result: 'database failure'});
    var array = [];
    for(var i=0; i<posts.length; i++){
      var target= posts[i];
      array.push({id:target.id, title:target.title, author:target.author, date:target.date});
    }

    res.json({result:"Success", data:array});
  });
});

router.get('/:category', function(req, res, next) {
  var raw_category = req.params.category;
  Post.find({category:raw_category}, function(err, posts){
    if(err) return res.status(500).send({result: 'database failure'});
    var array = [];
    for(var i=0; i<posts.length; i++){
      var target= posts[i];
      array.push({id:target.id, title:target.title, author:target.author, date:target.date});
    }

    res.json({result:"Success", data:array});
  });
});

module.exports = router;
