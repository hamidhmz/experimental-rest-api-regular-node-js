const ok = (data, message) => ({
	status: 'success',
	data,
	message,
});

const fail = (error, message) => ({
	status: 'fail',
	data: error,
	message,
});

module.exports = { fail, ok };
