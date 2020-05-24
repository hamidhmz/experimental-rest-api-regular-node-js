const Ajv = require('ajv');
const config = require('config');

const { fail, ok } = require('../util/response');
const { User } = require('../model');
const { hash } = require('../util/bcrypt');

const ajv = new Ajv({removeAdditional: true });

async function addUser(req, res) {
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

		res.send(ok(userSerializer(result),'user successfully added'));
	} catch (error) {
		res.status(400).send(fail(error));
	}
}

function userSerializer({ name, email, mobile }) {
	return { name, email, mobile };
}


module.exports = { addUser };
