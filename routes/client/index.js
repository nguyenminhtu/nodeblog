var express = require('express');
var router = express.Router();

Post = require('../../models/post.js');

/* GET home page. */
router.get('/', function(req, res) {
	Post.find().exec(function(err, posts){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			Post.paginate({}, { offset: 5, limit: 2 }).then(function(result) {
			 	console.log(result);
			 	res.render('client/index', { title: 'My NodeBlog', posts: posts, paginate: result });
			});
		}
	});
});

router.get('/about.html', function(req, res){
	res.render('client/about', {title: "About"});
});

router.get('/contact.html', function (req, res) {
	res.render('client/contact', {title: "Contact Page"})
});

module.exports = router;
