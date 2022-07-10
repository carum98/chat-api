import Chat from "../models/Chat.js"
import User from "../models/User.js"
import Message from "../models/Message.js"
import * as UpdateControllerSocket from "../sockets/controllers/update.controller.js"
import * as ChatControllerSocket from "../sockets/controllers/chat.controller.js"

export const get = async (req, res) => {
	let chats = await Chat.find({ users: { $in: req.user._id } })
		.populate("users", "name image")
		.populate("message", "id content createdAt isRead from")

	await Promise.all(
		chats.map(async chat => {
			chat.count = await Message.countDocuments({
				chatId: chat._id,
				to: req.user._id,
				isRead: false,
			})
		})
	)

	let data = chats.map(chat => {
		let user = chat.users.find(user => user.id.toString() !== req.user._id.toString())
		let message = chat.message ? chat.message.createObj(req.user._id.toString()) : null

		return {
			id: chat._id,
			user,
			message,
			count: chat.count,
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

	let chatRaw = await Chat.create({
		users: [req.user._id, user._id],
	})

	let chat = await Chat.findById(chatRaw._id)
		.populate("users", "name image socketId")

	UpdateControllerSocket.newChat(chat)

	return res.status(200).json({
		data: {
			id: chat._id,
			user: chat.users.find(user => user.id.toString() !== req.user._id.toString()),
			message: null,
		}
	})
}

export const messages = async (req, res) => {
	const { id } = req.params

	Message.find({ chatId: id, to: req.user._id, isRead: false })
		.populate("from", "socketId")
		.then((data) => {
			UpdateControllerSocket.read(data)
			ChatControllerSocket.read(data)
		})

	await Message.updateMany({ chatId: id, to: req.user._id, isRead: false }, { isRead: true })

	const messages = await Message.find({ chatId: id })
		.sort({ createdAt: -1 })

	return res.status(200).json({
		data: messages.map(message => message.createObj(req.user._id.toString()))
	})
}