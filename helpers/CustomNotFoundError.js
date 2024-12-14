class CustomNotFoundError extends Error {
	constructor(message, name) {
		super(message);
		this.statusCode = 404;
		this.name = "NotFoundError:";
	}
}

module.exports = CustomNotFoundError;
