import User from "../models/User.js"

export const get = async (req, res) => {
	const contacts = await User.find()

	return res.status(200).json({ data: contacts })
}