import User from "../models/User.js"

import { getChats, createChat, socketChatCreated } from "../services/chats.services.js"
import { readMessages, getMessages, socketReadMessages } from "../services/messages.services.js"

/**
 * Get all chats
 */
export const get = async (req, res) => {
	const { user } = req
	const chats = await getChats(user.id)

	return res.status(200).json({ data: chats })
}

/**
 * Create chat and notify chat created through websocket. 
 */
export const create = async (req, res) => {
	const { user_id } = req.body
	const user = await User.findOne({ _id: user_id })

	if (!user) {
		return res.status(404).json({ message: "User not found" })
	}

	const chat = await createChat(user.id, req.user.id)

	socketChatCreated(chat)

	return res.status(200).json({
		data: chat
	})
}

/**
 * Get messages by chat id. Read messages if not read and notify read messages through websocket. 
 */
export const messages = async (req, res) => {
	const { id: chatId } = req.params

	socketReadMessages(chatId, `${req.user.id}`)

	await readMessages(chatId, `${req.user.id}`)

	const messages = await getMessages(chatId)

	return res.status(200).json({
		data: messages.map(message => message.createObj(`${req.user.id}`))
	})
}