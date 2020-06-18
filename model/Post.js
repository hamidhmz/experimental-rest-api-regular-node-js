const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

const validatorSchema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		title: {
			type: 'string',
			maxLength: 255,
			minLength: 3,
		},
		description: {
			type: 'string',
			maxLength: 255,
			minLength: 3,
		},
		text: {
			type: 'string',
			maxLength: 10000,
			minLength: 3,
		},
	},
};

const Post = mongoose.model('Post', postSchema);

module.exports = {
	validator: validatorSchema,
	model: Post,
};
