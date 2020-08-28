const responseObject = status => (data, message) => ({ status, data, message });

const ok = responseObject('success');
const fail = responseObject('fail');

module.exports = { fail, ok };
