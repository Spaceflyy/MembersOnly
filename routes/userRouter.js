const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

const passport = require("passport");
const CustomNotFoundError = require("../helpers/CustomNotFoundError");

const { adduser, updateMembership } = userController;

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

router.post("/signup", adduser);

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/",
		failureMessage: true,
	})
);

router.post("/join", updateMembership);

router.get("/", messageController.getUserMessages);

router.use((req, res, next) => {
	throw new CustomNotFoundError("Page not Found!");
});
module.exports = router;
