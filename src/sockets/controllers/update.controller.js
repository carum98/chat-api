import { io } from "../../index.js"
import Message from "../../models/Message.js"

export const read = (messages) => {
	if (messages.length === 0) return

	console.log(messages)

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