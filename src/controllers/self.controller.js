import User from "../models/User.js"

export const get = async (req, res) => {
	const user = await User.findById(req.user._id).select("name number image")

	return res.status(200).json({ data: user })
} 