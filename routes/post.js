var express = require('express');
var router = express.Router();
var fs = require('fs');

var Post = require('../models/post')

router.get('/:id', function(req, res, next) {
  Post.findOne({id:req.params.id}, function(err, post){
    if(err) return res.status(500).send({result: 'database failure'});
    if(!post ) return res.status(404).send({result: 'No post'});
    if(post.picture_name !== '' && post.picture_name !== undefined && post.picture_name !== null){
      var savename = "images/" + post.id + "_" + post.picture_name;
      function base64_encode(file) {
          var bitmap = fs.readFileSync(file);
          return new Buffer(bitmap).toString('base64');
      }
      var base64str = base64_encode(savename);
      var total_data = post.header + base64str;
      return res.json({result:"Success", data:post, picture:total_data});
    }
    return res.json({result:"Success", data:post});
  });

});

router.delete('/:id', function(req, res, next) {
  Post.remove({id:req.params.id}, function(err,output){
    if(err) return res.status(500).send({result: 'database failure'});
    res.json({result:"Success"})
  });
});

router.post('/:id', function(req, res, next) {
  var id = req.params.id;
	var raw_title = req.body.title;
	var raw_category = req.body.category;
  var raw_content = req.body.content;
  var raw_date = req.body.date;
  var raw_author = req.body.author;
  var raw_picture = req.body.picture;

  Post.remove({id: parseInt(id)}, function(err,output){
    if(err) return res.status(500).send({result: 'database failure'});

    var newpost = new Post();
    newpost.id = id;
    newpost.title = raw_title;
    newpost.category = raw_category;
    newpost.content = raw_content;
    newpost.date = raw_date;
    newpost.author = raw_author;
    newpost.picture = raw_picture;

    newpost.save(function(err){
      if(err) res.status(500).send({result: 'database failure'});
      res.json({result:'Success'})
    });
  });
});

module.exports = router;
