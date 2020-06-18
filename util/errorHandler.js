function errorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	console.log('message',err.message);
	console.log('name',err.name);
	console.log('fileName',err.fileName);
	console.log('lineNumber',err.lineNumber);
	console.log('columnNumber',err.columnNumber);
	console.log('stack',err.stack);
	res.status(err.status || 500);
	res.send({ error: err.stack });
}

module.exports = errorHandler;
