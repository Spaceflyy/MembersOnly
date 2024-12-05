const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

router.get("/signup", (req, res) => {
	res.render("signup", { title: "Sign Up" });
});

router.get("/login", (req, res) => {
	res.render("login", { title: "Login" });
});

router.post("/signup", controller.adduser);

router.post("/login", controller.userlogin);

module.exports = router;
