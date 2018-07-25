var express = require('express');
var router = express.Router();
var fs = require('fs');

var Post = require('../models/post')

router.get('/', function(req, res, next) {
  Post.find(function(err, posts){
    if(err) return res.status(500).send({result: 'database failure'});
    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

    var array = [];
    for(var i=0; i<posts.length; i++){
      var target= posts[i];
      if(target.picture_name !== ''){
        // var savename = "images/" + target.id + "_" + target.picture_name;
        // var base64str = base64_encode(savename);
        // var total_data = target.header + base64str;
        array.push({name:target.picture_name, data: target.id + "_" + target.picture_name});
      }
    }
    res.json({result:"Success", data:array});
  });
});

// router.get('/', function(req, res, next) {
//   Post.find(function(err, posts){
//     if(err) return res.status(500).send({result: 'database failure'});
//     function base64_encode(file) {
//         var bitmap = fs.readFileSync(file);
//         return new Buffer(bitmap).toString('base64');
//     }
//
//     var array = [];
//     for(var i=0; i<posts.length; i++){
//       var target= posts[i];
//       if(target.picture_name !== ''){
//         var savename = "images/" + target.id + "_" + target.picture_name;
//         var base64str = base64_encode(savename);
//         var total_data = target.header + base64str;
//         array.push({name: target.picture_name, data : total_data});
//       }
//     }
//     res.json({result:"Success", data:array});
//   });
// });

module.exports = router;
