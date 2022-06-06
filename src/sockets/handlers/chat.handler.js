function disconnect() {
	console.log("Disconnecting from Chat")
}

function typing() {
	console.log("Typing...")
}

export default (io, socket) => {
	console.log("Connecting to Chat")

	socket.on("disconnect", disconnect)

	socket.on("typing", typing)

	socket.on("error", () => {
		socket.disconnect();
	})
}