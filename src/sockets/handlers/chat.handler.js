export default (io, socket) => {
	console.log("Connecting to Chat")

	socket.emit("chat:connect", {
		user: socket.user,
	})

	socket.on("disconnect", () => {
		console.log("Disconnecting from Chat")
	})

	socket.on("chat:typing", () => {
		socket.broadcast.emit("chat:typing")
	})

	socket.on("error", () => {
		socket.disconnect();
	})
}