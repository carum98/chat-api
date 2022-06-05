import User from "../models/User.js"
import jwt from "jsonwebtoken"

export default (req, res, next) => {
	const nonSecurePaths = ['/api/login', '/api/register'];
	if (nonSecurePaths.includes(req.path)) return next();

	try {
		const token = req.headers["authorization"]

		if (!token) {
			res.status(401).json({ message: "No token provided" })
		}

		const decoded = jwt.verify(token, 'node-api')
		const user = User.findById(decoded.id, { password: 0 })

		if (!user) {
			res.status(401).json({ message: "Invalid token" })
		}

		next()
	} catch (error) {
		return res.status(500).json({ message: 'Unauthorized' })
	}
}