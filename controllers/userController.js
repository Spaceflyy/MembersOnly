const db = require("../db/queries");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asnycHandler = require("express-async-handler");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const passLengthErr = "must be between 1 and 10 characters.";

const validateUser = [
	body("firstName")
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 10 })
		.withMessage(`First name ${lengthErr}`),
	body("lastName")
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ min: 1, max: 100 })
		.withMessage(`Last name ${lengthErr}`),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password cannot be empty.")
		.isLength({ min: 8, max: 100 })
		.withMessage(`Password ${passLengthErr}`)
		.matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.withMessage(
			"Password must contain at least one uppercase (A-Z), Symbol (!,$,#,%) and one Number (0-9)."
		),
	body("confirmPass")
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage("Passwords do not match."),
];

const validateSecret = [
	body("secretPassword")
		.trim()
		.custom((value, { req }) => {
			return value === process.env.ADMIN || value === process.env.SECRETPASSWORD;
		})
		.withMessage("Incorrect Password"),
];
const CustomNotFoundError = require("../helpers/CustomNotFoundError");

exports.adduser = [
	validateUser,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("signup", { title: "Sign up", errors: errors.array() });
		}

		const { firstName, lastName, username, password } = req.body;
		bcrypt.hash(password, 10, async (err, hashedPassword) => {
			try {
				await db.adduser(firstName, lastName, username, hashedPassword);
				res.redirect("/");
			} catch (err) {
				next(err);
			}
		});
	},
];

exports.updateMembership = [
	validateSecret,
	asnycHandler(async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.render("join", { title: "Join Membership", errors: errors.array() });
		}

		if (!req.session.passport) {
			throw new CustomNotFoundError("User Not Found.");
		}

		const { user } = await req.session.passport;

		if (req.body.secretPassword === process.env.SECRETPASSWORD) {
			await db.updateMembership(user);
		} else {
			await db.updateAdmin(user);
		}

		res.redirect("/");
	}),
];
