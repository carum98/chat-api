import Chat from "../../models/Chat.js"

export default async (socket, next) => {
	try {
		const chat_id = socket.handshake.query.chat_id

		if (!chat_id) {
			return next(new Error("No chat_id provided"))
		}

		let chat = await Chat.findById({ _id: chat_id })

		if (chat.socketId === null) {
			socket.chat = await Chat.findByIdAndUpdate(chat._id, { socketId: socket.id }, { new: true })
		}

		next()
	} catch (error) {
		console.log(error)
		return next(new Error("Chat socket error"))
	}
}