import Chat from "../../models/Chat.js"
import User from "../../models/User.js"

export default async (socket, next) => {
	try {
		const number = socket.handshake.query.number

		if (!number) {
			return next(new Error("No number provided"))
		}

		const user = await User.findOne({ number })

		let chat = await Chat.findOne({
			$or: [
				{ fromUserId: user._id, toUserId: socket.user._id },
				{ fromUserId: socket.user._id, toUserId: user._id },
			]
		})

		console.log({
			chat,
			fromUserId: socket.user._id,
			toUserId: user._id
		})

		if (!chat) {
			chat = await Chat.create({
				fromUserId: socket.user._id,
				toUserId: user._id,
				socketId: socket.id,
			})
		} else {
			chat.socketId = socket.id

			console.log('chat update', {
				chat: chat
			})

			Chat.findByIdAndUpdate(chat._id, chat, { new: true })
		}

		socket.chat = chat
		next()
	} catch (error) {
		console.log(error)
		return next(new Error("Chat error"))
	}
}