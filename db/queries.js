const pool = require("./pool");

exports.adduser = async (firstName, lastName, email, password) => {
	await pool.query(
		"INSERT INTO users(email, password, firstname,lastname) VALUES ($1,$2,$3,$4)",
		[email, password, firstName, lastName]
	);
};
