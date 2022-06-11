import Chat from "../../models/Chat.js"

export default (io, socket) => {
	console.log("Connecting to Chat")

	socket.emit("chat:connect", {
		user: socket.user,
	})

	socket.on("disconnect", () => {
		console.log("Disconnecting from Chat")

		Chat.findByIdAndUpdate(socket.chat.id, { socketId: null }, { new: true }).then(chat => {
			console.log('Disconect to chat', chat._id)
		})
	})

	socket.on("chat:typing", () => {
		socket.broadcast.emit("chat:typing")
	})

	socket.on("error", () => {
		socket.disconnect();
	})
}