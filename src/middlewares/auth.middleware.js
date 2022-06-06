import User from "../models/User.js"
import jwt from "jsonwebtoken"

export default async (req, res, next) => {
	const nonSecurePaths = ['/api/login', '/api/register', '/admin/', '/admin/index.js', '/socket.io/socket.io.js', '/admin/img/favicon.ico', '/admin/index.css'];
	if (nonSecurePaths.includes(req.path)) return next();

	try {
		const token = req.headers["authorization"]

		if (!token) {
			res.status(401).json({ message: "No token provided" })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findById(decoded.id, { password: 0 })

		req.user = user

		if (!user) {
			res.status(401).json({ message: "Invalid token" })
		}

		next()
	} catch (error) {
		return res.status(500).json({ message: 'Unauthorized' })
	}
}