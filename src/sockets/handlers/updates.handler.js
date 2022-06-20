import User from "../../models/User.js"

export default (socket) => {
	socket.emit("updates:connect", {
		user: socket.user,
	})

	socket.on("disconnect", () => {
		console.log("Disconnecting from Updates")
		User.findByIdAndUpdate(socket.user.id, { socketId: null }, { new: true })
	})

	socket.on("error", () => {
		socket.disconnect();
	})
}