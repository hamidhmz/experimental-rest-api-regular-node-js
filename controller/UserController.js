const Ajv = require('ajv');
const config = require('config');

const { fail, ok } = require('../util/response');
const { User } = require('../model');
const { hash, compare } = require('../util/bcrypt');

const ajv = new Ajv({ removeAdditional: true });

async function signUp(req, res, next) {
	try {
		const data = req.body;

		const valid = ajv.validate(User.validator, data);

		if (!valid) {
			return res.send(ajv.errors);
		}

		data.password = await hash(data.password, config.get('roundSalt'));

		const result = await User.model.create({
			name: data.name,
			email: data.email,
			mobile: data.mobile,
			password: data.password,
		});

		result.token = result.generateAuthToken();
		res.send(ok(userSerializer(result), 'user successfully added'));
	} catch (error) {
		switch (error.code) {
			case 11000:
				res.status(400).send(
					fail(undefined, 'email or name or mobile has been exists!')
				);
				break;

			default:
				next(error);
				break;
		}
	}
}

async function login(req, res, next) {
	try {
		const data = req.body;
		const valid = ajv.validate(User.loginValidator, data);
		if (!valid) {
			return res.send(ajv.errors);
		}

		const user = await User.model
			.findOne({ email: data.email })
			.select('+password');

		if (!user) {
			throw { status: 404 };
		}

		if (!(await compare(data.password, user.password))) {
			throw { status: 401 };
		}
		const result = {};
		result.token = user.generateAuthToken();
		res.send(ok(userSerializer(result), 'user successfully log in.'));
	} catch (error) {
		switch (error.status) {
			case 401:
				res.status(error.status).send(fail(undefined, 'Authentication fails.'));
				// res.send(fail(undefined, 'Authentication fails.')).status(400);
				break;
			case 404:
				res.status(error.status).send(fail(undefined, 'not found!'));
				break;

			default:
				next(error);
				break;
		}
	}
}

function userSerializer({ name, email, mobile, token }) {
	return { name, email, mobile, token };
}

module.exports = { signUp, login };
