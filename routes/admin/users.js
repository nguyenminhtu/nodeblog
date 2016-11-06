var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

User = require('../../models/user');

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

router.post('/login', passport.authenticate('local', {failureRedirect: '/mt_admin/login', failureFlash: 'Invalid username or password'}), function (req, res) {
	console.log('Authentication Successful');
	res.redirect('/mt_admin');
});

module.exports = router;