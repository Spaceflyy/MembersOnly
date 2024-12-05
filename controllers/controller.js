const db = require("../db/queries");
const bcrypt = require("bcryptjs");
exports.adduser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		try {
			await db.adduser(firstName, lastName, email, hashedPassword);
			res.redirect("/");
		} catch (err) {
			next(err);
		}
	});
};

exports.userlogin = (req, res) => {};
