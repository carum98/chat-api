import User from "../../models/User.js"

export default async (socket, next) => {
	try {
		await User.findByIdAndUpdate(socket.user.id, { socketId: socket.id }, { new: true })

		next()
	} catch (error) {
		console.log(error)
		next(new Error("Updates socket error"))
	}
}