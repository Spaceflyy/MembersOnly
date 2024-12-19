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

	delete req.session.messages;
	res.render("index", {
		title: "Home",
		user: req.user,
		message: req.session.messages,
		messages: userMessages,
	});
};

exports.deleteMessage = async (req, res) => {
	const { id } = req.params;
	db.deleteMessageById(id);
	res.redirect("/");
};
