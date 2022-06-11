import Chat from "../models/Chat.js"
import Message from "../models/Message.js"
import User from "../models/User.js"
import { io } from "../index.js"

export const get = async (req, res) => {
	const messages = await Message.find({
		$or: [
			{ fromUserId: req.user._id },
			{ toUserId: req.user._id },
		],
	})
		.populate("fromUserId", { name: 1, email: 1, number: 1 })
		.populate("toUserId", { name: 1, email: 1, number: 1 })

	return res.status(200).json({
		messages,
	})
}

export const create = async (req, res) => {
	const { content, chat_id } = req.body

	const chat = await Chat.findById(chat_id)

	if (!chat) {
		return res.status(404).json({ message: "Chat not found" })
	}

	let toUserId = [`${chat.fromUserId}`, `${chat.toUserId}`].find(id => id !== `${req.user._id}`)

	const message = await Message.create({
		content,
		fromUserId: req.user._id,
		toUserId: toUserId,
		chatId: chat._id,
	})

	if (chat.socketId !== null) {
		io.of("/chats").to(chat.socketId).emit("chat:message", message)
	}

	return res.status(200).json({ message })
}

export const update = async (req, res) => {
	const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	return res.status(200).json({
		message,
	})
}
