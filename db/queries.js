const pool = require("./pool");

exports.adduser = async (firstName, lastName, username, password) => {
	try {
		await pool.query(
			"INSERT INTO users(username, password, firstname,lastname) VALUES ($1,$2,$3,$4)",
			[username, password, firstName, lastName]
		);
	} catch (err) {
		console.error(err);
	}
};

exports.updateMembership = async (userId) => {
	try {
		await pool.query("UPDATE users SET memberstatus = 'true' WHERE id = ($1)", [
			userId,
		]);
	} catch (err) {
		console.error(err);
	}
};

exports.addMessage = async (title, message, userId) => {
	try {
		await pool.query(
			"INSERT INTO messages(title, message, userid) VALUES ($1,$2,$3)",
			[title, message, userId]
		);
	} catch (err) {
		console.error(err);
	}
};

exports.getMessagesByuserId = async (userId) => {
	try {
		const { rows } = await pool.query(
			"SELECT title, message, posted, CONCAT(firstname,' ', lastname) as author, memberstatus FROM messages JOIN users ON users.id = ($1);",
			[userId]
		);
		return rows;
	} catch (err) {
		console.error(err);
	}
};

// exports.findUserByID = async (userId) => {
// 	try {
// 		const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [
// 			userId,
// 		]);
// 		return rows;
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
