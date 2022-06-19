import Chat from "../models/Chat.js"
import User from "../models/User.js"
import Message from "../models/Message.js"

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
		let message = chat.message ? {
			id: chat.message._id,
			content: chat.message.content,
			createdAt: chat.message.createdAt,
			isMine: req.user._id.toString() === chat.message.from._id.toString(),
			isRead: chat.message.isRead,
		} : null

		return {
			id: chat._id,
			user: chat.users.find(user => user.id.toString() !== req.user._id.toString()),
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
		.populate("users", "name image")
		.populate("message", "content createdAt")

	return res.status(200).json({
		data: {
			id: chat._id,
			user: chat.users.find(user => user.id.toString() !== req.user._id.toString()),
			message: chat.message,
		}
	})
}

export const messages = async (req, res) => {
	const { id } = req.params

	await Message.updateMany({ chatId: id, to: req.user._id, isRead: false }, { isRead: true })

	const messages = await Message.find({ chatId: id })
		.populate("from", { name: 1, image: 1 })
		.populate("to", { name: 1, image: 1 })
		.sort({ createdAt: -1 })

	let data = messages.map(message => {
		return {
			id: message._id,
			content: message.content,
			createdAt: message.createdAt,
			isMine: req.user._id.toString() === message.from._id.toString(),
			isRead: message.isRead,
		}
	})

	return res.status(200).json({ data })
}