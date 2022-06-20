import Chat from "../models/Chat.js"
import User from "../models/User.js"
import Message from "../models/Message.js"
import { io } from "../index.js"

export const get = async (req, res) => {
	const messages = await Message.findById(req.params.id)

	return res.status(200).json({ data: messages.createObj(req.user._id.toString()) })
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
	const userTo = await User.findById(message.to.toString())

	io.of("/chats").to(`chat:${chat_id}`)
		.emit("chat:message", { message_id: message._id })

	io.of("/updates").to(userTo.socketId)
		.emit("updates:message", { message: message.createObj(), chat_id })

	io.of("/updates").to(req.user.socketId)
		.emit("updates:message", { message: message.createObj(req.user._id.toString()), chat_id })

	return res.status(200).json({
		data: message.createObj(req.user._id.toString())
	})
}

export const update = async (req, res) => {
	const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	return res.status(200).json({ data: message })
}
