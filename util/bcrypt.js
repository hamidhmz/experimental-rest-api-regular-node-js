const bcrypt = require('bcryptjs');

async function hash(password, saltRounds) {
	if (saltRounds > 20) {
		throw 'salt should be less than 20';
	}
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) reject(err);
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) reject(err);
				resolve(hash);
			});
		});
	});
}

async function compare(password, hashedPassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hashedPassword, function (err, isMatch) {
			if (err) reject(err);
			resolve(isMatch);
		});
	});
}

module.exports = { hash, compare };
