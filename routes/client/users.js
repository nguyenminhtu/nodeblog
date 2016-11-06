var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

User = require('../../models/user');

router.get('/signup', function(req, res){
	res.render('client/signup', {title: 'Sign up'});
});

router.get('/signin', function(req, res){
	res.render('client/signin', {title: 'Sign in'});
});

router.post('/signup', function(req, res, next){
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var confirmpasword = req.body.confirmpasword;

	var newUser = new User({
		username: username,
		password: password,
		email: email,
		level: 1
	});

	User.createUser(newUser, function(err, user){
		if(err) throw err;
		console.log(user);
	});

	req.flash('success', 'You are now registered and may now login');
	res.location('/users/signin');
	res.redirect('/users/signin');
});


// Passport
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ 'username': username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
      	console.log('Unknown user');
        return done(null, false, { message: 'Incorrect username.' });
      }
      console.log('valid user');
      User.comparePassword(password, user.password, function(err, isMatch){
      	if(err) throw err;
      	if(isMatch){
      		return done(null, user);
      	}else{
      		return done(null, false, {message: 'Invalid Password.'});
      	}
      });
      return done(null, user);
    });
  }
));


router.post('/signin', passport.authenticate('local', {failureRedirect: '/users/signin', failureFlash: 'Invalid username or password'}), function(req, res){
	res.location('/');
	res.redirect('/');
});

router.get('/signout', function(req, res){
	req.logout();
	res.redirect('/users/signin');
});

module.exports = router;