import { createMessage, getMessage, socketNewMessage } from "../services/messages.services.js"
import { getChat } from "../services/chats.services.js"

/**
 * Get message by id. 
 */
export const get = async (req, res) => {
	const { id: message_id } = req.params
	const { user } = req

	const message = await getMessage(message_id, user.id)

	return res.status(200).json({ data: message })
}

/**
 *	Create message and notify new message through websocket. 
 */
export const create = async (req, res) => {
	const { content, chat_id } = req.body

	const chat = await getChat(chat_id)

	if (!chat) {
		return res.status(404).json({ message: "Chat not found" })
	}

	const message = createMessage(content, `${req.user._id}`, chat)
	socketNewMessage(`${message.id}`, `${req.user._id}`, chat_id)

	await chat.updateOne({ message: message.id })

	return res.status(200).json({ data: message })
}
