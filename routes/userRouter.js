const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");
const passport = require("passport");
const CustomNotFoundError = require("../helpers/CustomNotFoundError");

router.get("/signup", (req, res) => {
	res.render("signup", { title: "Sign Up" });
});

router.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

router.get("/join", (req, res) => {
	res.render("join", { title: "Join Membership" });
});

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

router.post("/signup", controller.adduser);

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/",
		failureMessage: true,
	})
);

router.post("/join", controller.updateMembership);

router.get("/", (req, res) => {
	const msgs = req.session.messages;
	delete req.session.messages;
	res.render("index", {
		title: "Home",
		user: req.user,
		message: msgs,
	});
});

router.use((req, res, next) => {
	throw new CustomNotFoundError("Page not Found!");
});
module.exports = router;
