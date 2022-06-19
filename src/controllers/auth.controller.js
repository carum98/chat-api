import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
	const { email, password } = req.body

	const userFound = await User.findOne({ email })

	if (!userFound) {
		return res.status(400).json({
			message: 'User not found',
		})
	}

	const isMatch = await userFound.matchPassword(password)

	if (!isMatch) {
		return res.status(400).json({
			message: 'Password does not match',
		})
	}

	const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	})

	return res.status(200).json({
		message: 'Login successful',
		token,
	})
}

export const register = async (req, res) => {
	const { file } = req
	const { name, email, password, number } = req.body

	const userFound = await User.findOne({ email })

	if (userFound) {
		return res.status(400).json({
			message: 'User already exists',
		})
	}

	const user = new User({
		name,
		email,
		password: await User.encryptPassword(password),
		number,
		image: file.filename,
	})

	await user.save()

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	})

	return res.status(200).json({
		message: 'Registration successful',
		token,
	})
}