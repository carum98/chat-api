import Chat from "../models/Chat.js"
import User from "../models/User.js"
import Message from "../models/Message.js"
import { io } from "../index.js"

export const get = async (req, res) => {
	const messages = await Message.find({
		$or: [
			{ from: req.user._id },
			{ to: req.user._id },
		],
	})
		.populate("from", { name: 1, email: 1, number: 1 })
		.populate("to", { name: 1, email: 1, number: 1 })

	return res.status(200).json({ data: messages })
}

export const create = async (req, res) => {
	const { content, chat_id } = req.body

	const chat = await Chat.findById(chat_id)

	if (!chat) {
		return res.status(404).json({ message: "Chat not found" })
	}

	const message = await Message.create({
		content,
		from: req.user._id,
		to: chat.users.find(id => `${id}` !== `${req.user._id}`),
		chatId: chat_id,
	})

	await chat.updateOne({ message: message._id })

	io.of("/chats").to(`chat:${chat_id}`).emit("chat:message", message)

	let userTo = await User.findById(message.to.toString())
	io.of("/updates").to(userTo.socketId).to(req.user.socketId).emit("updates:message")

	return res.status(200).json({ data: message })
}

export const update = async (req, res) => {
	const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	return res.status(200).json({ data: message })
}
