import Chat from "../models/Chat.js"
import Message from "../models/Message.js"
import * as UpdateControllerSocket from "../sockets/controllers/update.controller.js"
import * as ChatControllerSocket from "../sockets/controllers/chat.controller.js"

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

	ChatControllerSocket.newMessage(message._id, chat_id)
	UpdateControllerSocket.newMessage(message._id, req.user._id.toString(), chat_id)

	return res.status(200).json({
		data: message.createObj(req.user._id.toString())
	})
}

export const update = async (req, res) => {
	const { is_read } = req.body

	if (!is_read) {
		return res.status(400).json({ message: "Bad request" })
	}

	const message = await Message.findByIdAndUpdate(req.params.id, { isRead: is_read }, {
		new: true,
	})

	return res.status(200).json({ data: message })
}
