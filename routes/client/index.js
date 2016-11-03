var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');

Post = require('../../models/post.js');

/* GET home page. */
router.get('/', function(req, res) {
	Post.find().exec(function(err, posts){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.render('client/index', { title: 'My NodeBlog', posts: posts });
		}
	});
});

router.get('/about.html', function(req, res){
	res.render('client/about', {title: "About"});
});

router.get('/contact.html', function (req, res) {
	res.render('client/contact', {title: "Contact Page"})
});

router.post('/contact/send', function (req, res, next) {
	var transporter = nodeMailer.createTransport({
		service: 'Gmail',
		port: 465,
		auth: {
			user: 'tuunguyen2795@gmail.com',
			pass: 'Tunguyen02071995'
		}
	});

	var mailOptions = {
		from: 'TuNguyen <tuunguyen2795@gmail.com>',
		to: 'tuunguyen2795@gmail.com',
		subject: 'NodeBlog submission',
		text: 'You have a new submission from NodeBlog with the following details...Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message+'',
		html: '<p>You have a new submission from Express Website with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/contact.html');
		}else{
			req.flash('success', 'Message sent');
			console.log('Message sent ' + info.response);
			res.redirect('/contact.html');
		}
	});
});

module.exports = router;
