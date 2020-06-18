const faker = require('faker');

function generatePassword(previousGeneratedPassword) {
	let result = faker.internet.password();

	if (previousGeneratedPassword && result == previousGeneratedPassword)
		return generatePassword(previousGeneratedPassword);

	return result;
}

function generateSalt() {
	const saltRounds = faker.random.number({ min: 5, max: 15 });
	return saltRounds;
}

function generateRandomNumber({ max, min }) {
	const option = {};
	max ? (option.max = max) : false;
	min ? (option.min = min) : false;
	const result = faker.random.number(option);
	return result;
}

function generateRandomMessage() {
	const result = faker.lorem.sentence();
	return result;
}

function generateRandomObjectData() {
	const result = {};
	const length = faker.random.number(20)
	for (let index = 0; index < length; index++) {
		result[faker.random.word()] = faker.random.word()
	}
	return result;
}

module.exports = {
	generatePassword,
	generateRandomMessage,
	generateSalt,
	generateRandomObjectData,
	generateRandomNumber,
};
