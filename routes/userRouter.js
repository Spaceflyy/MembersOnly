const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

router.get("/signup", (req, res) => {
	res.render("signup", { title: "Sign Up" });
});

router.post("/signup", (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	console.log(firstName);
	res.redirect("/");
});
module.exports = router;
