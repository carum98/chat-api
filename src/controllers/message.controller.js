import Chat from "../models/Chat.js"
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

	let to = chat.users.find(id => `${id}` !== `${req.user._id}`)

	const message = await Message.create({
		content,
		from: req.user._id,
		to: to,
		chatId: chat._id,
	})

	await chat.update({ message: message._id })

	if (chat.socketId !== null) {
		io.of("/chats").to(chat.socketId).emit("chat:message", message)
	}

	return res.status(200).json({ data: message })
}

export const update = async (req, res) => {
	const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	return res.status(200).json({ data: message })
}
