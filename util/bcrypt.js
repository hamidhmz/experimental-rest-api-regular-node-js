const bcrypt = require('bcryptjs');

async function hash(password, saltRounds) {
	return await new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
}

module.exports = { hash };
