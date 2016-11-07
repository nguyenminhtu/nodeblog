var express = require('express');
var router = express.Router();

Post = require('../../models/post.js');

router.get('/:id/show', function (req, res) {
	var id = req.params.id;
	Post.findOne({ '_id': id }, {}, function(err, post){
		Post.count().exec(function(err, count){
			var ran = Math.floor(Math.random() * count);

			Post.find().limit(4).skip(ran).sort('-date').exec(function(err, relatePosts){
				if(err){
					console.log(err);
					res.end(err);
				}else{
					res.render('client/post', {title: "Post Detail", post: post, relatePosts: relatePosts});
				}
			})
		});
	});
});

module.exports = router;
