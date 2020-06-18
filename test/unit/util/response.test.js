const faker = require('../../factory/faker');
const { ok, fail } = require('../../../util/response');

describe('test response module includes 2 functions (ok, fail)', () => {
	describe('test ok function', () => {
		it('should return an object with success status and custom data and custom message', async () => {
			const data = faker.generateRandomObjectData();
			const message = faker.generateRandomMessage();
			const okResult = ok(data, message);
			expect(okResult).toStrictEqual({ status: 'success', data, message });
		});
	});
	describe('test fail function', () => {
		it('should return an object with fail status and custom data and custom message', async () => {
			const data = faker.generateRandomObjectData();
			const message = faker.generateRandomMessage();
			const failResult = fail(data, message);
			expect(failResult).toStrictEqual({ status: 'fail', data, message });
		});
	});
});
