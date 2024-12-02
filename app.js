const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
	res.render("index");
});

app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
