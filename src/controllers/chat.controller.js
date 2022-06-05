import Chat from "../models/Chat.js"
import Message from "../models/Message.js"

export const get = async (req, res) => {
	let chats = await Chat.find({ fromUserId: req.user._id })
		.populate("fromUserId", { name: 1 })
		.populate("toUserId", { name: 1 })

	return res.status(200).json({ chats })
}

export const messages = async (req, res) => {
	const messages = await Message.find({
		chatId: req.params.id,
		fromUserId: req.user._id,
	}, { chatId: 0 })
		.populate("fromUserId", { name: 1 })
		.populate("toUserId", { name: 1 })

	return res.status(200).json({ messages })
}