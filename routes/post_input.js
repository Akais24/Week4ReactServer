var express = require('express');
var router = express.Router();
var fs = require('fs');

var Count = require('../models/count')
var Post = require('../models/post')

var bodyParser  = require('body-parser');
var app         = express();
app.use(bodyParser.json({limit : '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit : '50mb' }));

/* GET users listing. */
router.post('/', function(req, res, next) {
	var raw_title = req.body.title;
	var raw_category = req.body.category;
  var raw_content = req.body.content;
  var raw_date = req.body.date;
  var raw_author = req.body.author;
  var raw_picture = req.body.picture;
  var raw_picture_name = req.body.picture_name;
	console.log(raw_picture);

  Count.findOne(function(err, count){
		if(err) return res.status(500).send({result: 'database failure'});

    var index = count.index + 1;
    var newcount = new Count();
    newcount.index = index;
    Count.remove({index:index-1}, function(err,outpu){
			if(err) return res.status(500).send({result: 'database failure'});
    })
    newcount.save(function(err){
			if(err) return res.status(500).send({result: 'database failure'});
    });

    var newpost = new Post();
    newpost.id = index;
    newpost.title = raw_title;
		newpost.category = raw_category;
    newpost.content = raw_content;
    newpost.date = raw_date;
    newpost.author = raw_author;
		newpost.picture_name = raw_picture_name;

		if(raw_picture_name !== ''){
			var savename = "images/" + index + "_" + raw_picture_name;
			console.log(savename);
			console.log(raw_picture);

			var raw_data_list = raw_picture.split(";base64,");
			var header = raw_data_list[0];
			var body = raw_data_list[1];
			newpost.header = header + ";base64,";
			console.log(newpost.header);

      fs.writeFile(savename, body, 'base64', function(err) {
        if(err){
          console.log("error", err);
          return res.json({result: "Error in converting"});
        }else{
					newpost.save(function(err){
			      if(err){
							console.log(err)
							return res.status(500).send({result: 'database failure'});
						}else return res.json({result:'Success'})
			    });
				}
      });
		}else{
			newpost.save(function(err){
	      if(err){
					console.log(err)
					return res.status(500).send({result: 'database failure'});
				}else return res.json({result:'Success'})
	    });
		}


  });

});

module.exports = router;
