var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var Post = require('../models/post')

router.get('/:filename', function(req, res, next) {
  var filename = req.params.filename;
  var raw_id = filename.split("_")[0];
  var raw_type = filename.split(".").pop();

  Post.findOne({id:raw_id}, function(err, post){
    if(err) return res.status(500).send({result: 'database failure'});
    if(!post ) return res.status(404).send({result: 'No post'});
    if(post.picture_name !== ''){
      var savename = post.id + "_" + post.picture_name;
      return res.sendFile(path.join(__dirname, '../images', savename));

    }else{
      return res.json({result:"No image"});
    }
  });
});

module.exports = router;
