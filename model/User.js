const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

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
		select: false,
	},
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id, email: this.email }, config.get('jwt'), {
		expiresIn: '10h',
	});
};

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

const loginValidator = {
	type: 'object',
	additionalProperties: false,
	properties: {
		email: {
			format: 'email',
			maxLength: 70,
		},
		password: {
			type: 'string',
			maxLength: 200,
			minLength: 5,
		},
	},
	required: ['email', 'password'],
};

//Export the model
const User = mongoose.model('User', userSchema);

module.exports = {
	loginValidator,
	validator: validatorSchema,
	model: User,
};
