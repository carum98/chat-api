export default (socket) => {
	console.log("Connecting to QR")

	socket.on("error", () => {
		socket.disconnect();
	})
}