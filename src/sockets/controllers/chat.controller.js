import { io } from "../../index.js"

export const newMessage = (message_id, chat_id) => {
	io.of("/chats").to(`chat:${chat_id}`).emit("chat:message", { message_id })
}