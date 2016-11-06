var mongoose = require('mongoose');

// Post schema
var postSchema = mongoose.Schema({
	title: {
		type: String
	},
	content: {
		type: String
	},
	image: {
		type: String
	},
	date: {
		type: Date
	}
});

var Post = module.exports = mongoose.model('Post', postSchema);

module.exports.createPost = function(newPost, callback){
	newPost.save(callback);
}
