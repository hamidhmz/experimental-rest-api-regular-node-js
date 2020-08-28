const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = async (req, res, next) => {
	if (!req.headers || !req.headers.authorization) return res.sendStatus(401);

	const bearerToken = req.headers.authorization;

	if (!bearerToken.startsWith('Bearer '))
		return res.status(401).send('invalid token.');

	const token = bearerToken.split('Bearer ')[1].trim();

	if (!token) return res.status(401).send('invalid token.');

	const payload = await User.model
		.verifyAuthToken(token)
		.then((payload) => {
			req.user = payload;
			next();
		})
		.catch(() => {
			res.sendStatus(401);
		});
};
