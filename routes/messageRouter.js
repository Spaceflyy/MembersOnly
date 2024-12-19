const { Router } = require("express");
const router = Router();
const messageController = require("../controllers/messageController");

const { deleteMessage, newMessage } = messageController;

router.get("/", (req, res) => {
	res.render("createMessage", { title: "Create new message." });
});

router.post("/", newMessage);

module.exports = router;
