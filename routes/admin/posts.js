var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

Post = require('../../models/post.js');

router.get('/', ensureAuthenticated, function(req, res) {
	Post.find().sort('-date').exec(function(err, posts){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.render('admin/posts', { title: 'All Posts', posts: posts });
		}
	});
});

router.get('/add', ensureAuthenticated, function(req, res){
	res.render('admin/addpost', {title: "Add more post"});
});


router.post('/add', function(req, res, next){
	// Get Form value
	var title 		= req.body.title;
	var content 	= req.body.content;
	var date 		= new Date();

	req.checkBody('title', 'Title is required');

	var errors = req.validationErrors();

	if(errors){
		res.render('admin/addpost');
	}else{
		var newPost = new Post({
			'title': title,
			'content': content,
			'image': "web.jpg",
			'date': date
		});

		Post.createPost(newPost, function(err, post){
			if(err){
				res.end(err);
			}else{
				console.log(post);
				res.redirect('/mt_admin/posts');
			}
		});
	}

});

router.delete('/delete/:id', function(req, res){
	var id = req.params.id;
	var query = {_id: id};
	Post.remove(query, function(err, done){
		if(err){
			res.end(err);
		}else{
			res.send('ok');
		}
	});
});

router.get('/edit/:id', function(req, res){
	var id = req.params.id;
	var query = {_id: id};
	Post.findOne(query, function(err, post){
		res.render('admin/editpost', {post: post, title: "Edit post"});
	})
});

router.post('/edit/:id', function(req, res){
	var id = req.params.id;

	var title = req.body.title;
	var content = req.body.content;
	var image = req.body.imagename;
	var date = new Date();

	var query = {_id: id};
	Post.findOneAndUpdate(query, { $set: { title: title, content: content, image: image, date: date } }, function(err, result){
		if(err){
			res.end(err);
		}else{
			req.flash('success', 'Updated successfull');
			res.redirect('/mt_admin/posts/edit/' + id);
		}
	});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated() && req.user.level == 0){
		next();
	}else{
		res.redirect('/mt_admin/login');
	}
}

module.exports = router;;