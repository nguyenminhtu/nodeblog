var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

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
	},
	comments: [{
		comment_username: {type: String},
		comment_content: {type: String},
		comment_date: {type: Date}
	}]
});

postSchema.plugin(mongoosePaginate);

var Post = module.exports = mongoose.model('Post', postSchema);