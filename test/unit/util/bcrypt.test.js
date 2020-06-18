const faker = require('../../factory/faker');
const { hash, compare, generateRandomNumber } = require('../../../util/bcrypt');

describe('test bcrypt function for hash password', () => {
	const password = faker.generatePassword();
	const password2 = faker.generatePassword(password);
	const saltRounds = faker.generateSalt();
	const invalidSalt = faker.generateRandomNumber({ min: 21 });

	/* -------------------------------------------------------------------------- */
	/*                        happy path for hash function                        */
	/* -------------------------------------------------------------------------- */

	it('should return hashed password which is same as previous hashed password', async () => {
		const hashedPassword = await hash(password, saltRounds);
		const isMatch = await compare(password, hashedPassword);
		expect(isMatch).toBeTruthy();
	});

	/* -------------------------------------------------------------------------- */
	/*                       happy path for compare function                      */
	/* -------------------------------------------------------------------------- */

	it('should return hashed password which is same as previous hashed password without saltRounds', async () => {
		const hashedPassword = await hash(password);
		const isMatch = await compare(password, hashedPassword);
		expect(isMatch).toBeTruthy();
	});

	it('should return hashed password which is not the same as previous hashed password in same password', async () => {
		const hashedPassword1 = await hash(password, saltRounds);
		const hashedPassword2 = await hash(password, saltRounds);
		expect(hashedPassword1).not.toBe(hashedPassword2);
	});

	it('should return hashed password which is not the same as previous hashed password', async () => {
		const hashedPassword = await hash(password, saltRounds);
		const isMatch = await compare(password2, hashedPassword);
		expect(isMatch).toBeFalsy();
	});

	it('should throw an error when there is no arguments for hash function ', async () => {
		const hashedPassword = hash();
		expect(hashedPassword).rejects.toThrow();
	});

	it('should throw an error when saltRounds is bigger than 20 ', async () => {
		const hashedPassword = hash(password, invalidSalt);
		expect(hashedPassword).rejects.toThrow('salt should be less than 20');
	});

	it('should throw an error when there is no arguments for compare function ', async () => {
		const isMatch = compare();
		expect(isMatch).rejects.toThrow();
	});

	it('should throw an error when there is just one argument for compare function ', async () => {
		const isMatch = compare(password);
		expect(isMatch).rejects.toThrow();
	});
});
