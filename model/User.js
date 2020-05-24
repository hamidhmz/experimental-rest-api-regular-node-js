const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	mobile: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const validatorSchema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		name: {
			type: 'string',
			maxLength: 70,
			minLength: 3,
		},
		email: {
			format: 'email',
			maxLength: 70,
		},
		password: {
			type: 'string',
			maxLength: 200,
			minLength: 5,
		},
		mobile: {
			type: 'string',
			maxLength: 20,
			minLength: 5,
		},
	},
	required: ['name', 'email', 'password', 'mobile'],
};

//Export the model
const User = mongoose.model('User', userSchema);

module.exports = {
	validator: validatorSchema,
	model: User,
};
