var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var userSchema = mongoose.Schema({
	email: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String,
		bcrypt: true
	},
	level: {
		type: Number
	}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

module.exports.createUser = function(user, callback){
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err) throw err;
		user.password = hash;
		user.save(callback);
	});
}