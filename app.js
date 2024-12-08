const path = require("node:path");
const pool = require("./db/pool");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userRouter = require("./routes/userRouter");
const bcrypt = require("bcryptjs");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const { rows } = await pool.query(
				"SELECT * FROM users WHERE username = $1",
				[username]
			);
			const user = rows[0];

			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
		const user = rows[0];

		done(null, user);
	} catch (err) {
		done(err);
	}
});

app.use("/", userRouter);
app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/",
		failureMessage: true,
	})
);

app.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});
app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
