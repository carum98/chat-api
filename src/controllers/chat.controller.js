import Chat from "../models/Chat.js"
import User from "../models/User.js"
import Message from "../models/Message.js"

export const get = async (req, res) => {
	let chats = await Chat.find({ users: { $in: req.user._id } })
		.populate("users", "name")
		.populate("message", "content createdAt")

	let data = chats.map(chat => {
		return {
			id: chat._id,
			user: chat.users.find(user => user.id.toString() !== req.user._id.toString()),
			message: chat.message,
		}
	})

	return res.status(200).json({ data })
}

export const create = async (req, res) => {
	const { number } = req.body

	let user = await User.findOne({ number })

	if (!user) {
		return res.status(404).json({ message: "User not found" })
	}

	let chat = await Chat.create({
		users: [req.user._id, user._id],
	})

	return res.status(200).json({ chat })
}

export const messages = async (req, res) => {
	const messages = await Message.find({ $or: [{ from: req.user._id }, { to: req.user._id }] }, { chatId: 0 })
		.populate("from", { name: 1 })
		.populate("to", { name: 1 })
		.sort({ createdAt: -1 })

	let data = messages.map(message => {
		return {
			id: message._id,
			content: message.content,
			createdAt: message.createdAt,
			isMine: req.user._id.toString() === message.from._id.toString(),
		}
	})

	return res.status(200).json({ data })
}