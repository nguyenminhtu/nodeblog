var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	email: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	},
	level: {
		type: Number
	}
});

var User = module.exports = mongoose.model('User', userSchema);