const db = require("../db/queries");

exports.newMessage = async (req, res) => {
	const { user } = await req.session.passport;
	const { title, message } = req.body;
	console.log(message);

	await db.addMessage(title, message, user);
	res.redirect("/");
};

exports.getUserMessages = async (req, res) => {
	const userMessages = await db.getAllMessages();

	const msgs = req.session.messages;
	delete req.session.messages;
	res.render("index", {
		title: "Home",
		user: req.user,
		message: msgs,
		messages: userMessages,
	});
};
