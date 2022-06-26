import Message from "../../models/Message.js"
import * as UpdateControllerSocket from "../controllers/update.controller.js"

export default (socket) => {
	console.log("Connecting to Chat")

	socket.join(`chat:${socket.handshake.query.chat_id}`)

	socket.emit("chat:connect", {
		user: socket.user,
	})

	socket.on("disconnect", () => {
		console.log("Disconnecting from Chat")
	})

	socket.on("chat:typing", () => {
		socket.to(`chat:${socket.handshake.query.chat_id}`).emit("chat:typing")
	})

	socket.on("chat:read", async (payload) => {
		await Message.updateOne(
			{ _id: payload },
			{ isRead: true },
			{ new: true }
		)

		Message.findById(payload)
			.populate("from", "socketId")
			.then(data => UpdateControllerSocket.read([data]))
	})

	socket.on("error", () => {
		socket.disconnect();
	})
}