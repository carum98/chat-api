import User from "../../models/User.js"
import jwt from "jsonwebtoken"

export default async (socket, next) => {
	try {
		const token = socket.handshake.auth.token

		if (!token) {
			return next(new Error("No token provided"))
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.id, { password: 0 })

		if (!user) {
			return next(new Error("Invalid token"))
		}

		socket.user = user
		next()
	} catch (error) {
		return next(new Error("Authentication error"))
	}
}