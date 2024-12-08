const pool = require("./pool");

exports.adduser = async (firstName, lastName, username, password) => {
	try {
		await pool.query(
			"INSERT INTO users(username, password, firstname,lastname) VALUES ($1,$2,$3,$4)",
			[username, password, firstName, lastName]
		);
	} catch (err) {
		return next(err);
	}
};
