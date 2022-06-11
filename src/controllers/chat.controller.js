import Chat from "../models/Chat.js"
import User from "../models/User.js"
import Message from "../models/Message.js"

export const get = async (req, res) => {
	let chats = await Chat.find({ $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }] })
		.populate("fromUserId", { name: 1 })
		.populate("toUserId", { name: 1 })

	return res.status(200).json({ chats })
}

export const create = async (req, res) => {
	const { number } = req.body

	let user = await User.findOne({ number })

	if (!user) {
		return res.status(404).json({ message: "User not found" })
	}

	let chat = await Chat.create({
		fromUserId: req.user._id,
		toUserId: user._id,
		socketId: null,
	})

	return res.status(200).json({ chat })
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