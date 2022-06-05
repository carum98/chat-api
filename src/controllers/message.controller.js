import Message from "../models/Message.js"
import User from "../models/User.js"

export const get = async (req, res) => {
	const messages = await Message.find({
		$or: [
			{ fromUserId: req.user._id },
			{ toUserId: req.user._id },
		],
	})
		.populate("fromUserId", { name: 1, email: 1, number: 1 })
		.populate("toUserId", { name: 1, email: 1, number: 1 })

	return res.status(200).json({
		messages,
	})
}

export const create = async (req, res) => {
	const { content, user_number } = req.body

	const userTo = await User.findOne({ number: user_number })

	const message = await Message.create({
		content,
		fromUserId: req.user._id,
		toUserId: userTo._id,
	})

	return res.status(200).json({
		message
	})
}

export const update = async (req, res) => {
	const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	return res.status(200).json({
		message,
	})
}
