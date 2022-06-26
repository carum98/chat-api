import { io } from "../../index.js"
import Message from "../../models/Message.js"
import Chat from "../../models/Chat.js"

export const read = (messages) => {
	if (messages.length === 0) return

	const socketId = messages[0].from.socketId
	const value = messages.map(message => ({ message_id: message._id, chat_id: message.chatId }))

	io.of("/updates").to(socketId).emit("updates:read", value)
}

export const newMessage = async (message_id, user_id, chat_id) => {
	let message = await Message.findById(message_id)
		.populate("from", "socketId")
		.populate("to", "socketId")

	io.of("/updates").to(message.to.socketId)
		.emit("updates:message", { message: message.createObj(), chat_id })

	io.of("/updates").to(message.from.socketId)
		.emit("updates:message", { message: message.createObj(user_id), chat_id })
}

export const newChat = (chat) => {
	io.of("/updates").to(chat.users[0].socketId).emit("updates:chat", {
		id: chat._id,
		user: chat.users[1],
		message: null,
		count: 0,
	})

	io.of("/updates").to(chat.users[1].socketId).emit("updates:chat", {
		id: chat._id,
		user: chat.users[0],
		message: null,
		count: 0,
	})
}