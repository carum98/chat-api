import { io } from "../../index.js"

export const newMessage = (message_id, chat_id) => {
	io.of("/chats").to(`chat:${chat_id}`).emit("chat:message", { message_id })
}

export const read = (messages) => {
	if (messages.length === 0) return

	const chat_Id = messages[0].chatId
	const value = messages.map(message => ({ message_id: message._id, chat_id: message.chatId }))

	io.of("/chats").to(`chat:${chat_Id}`).emit("chat:read", value)
}