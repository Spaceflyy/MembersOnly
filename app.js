const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./helpers/passportSetup");
const userRouter = require("./routes/userRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);

app.use((err, req, res, next) => {
	console.error(err);
	// We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
	res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
