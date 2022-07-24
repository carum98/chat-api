import Message from "../models/Message.js"

import * as UpdateControllerSocket from "../sockets/controllers/update.controller.js"
import * as ChatControllerSocket from "../sockets/controllers/chat.controller.js"

/**
 * Get messages by chat id.
 * 
 * @param {string} chatId 
 */
export const getMessages = async (chatId) => {
	return await Message.find({ chatId }).sort({ createdAt: -1 })
}

/**
 * Get message by id.
 * 
 * @param {string} messageId 
 * @param {string} userId 
 * @returns {Promise<*>}
 */
export const getMessage = async (messageId, userId) => {
	const message = await Message.findById(messageId)

	return message.createObj(userId)
}

/**
 * Create message.
 * 
 * @param {string} content 
 * @param {string} userFrom 
 * @param {*} chat 
 * @returns {Promise<*>}
 */
export const createMessage = async (content, userFrom, chat) => {
	const message = await Message.create({
		content,
		from: userFrom,
		to: chat.users.find(id => `${id}` !== userFrom),
		chatId: chat._id,
	})

	return message.createObj(userFrom)
}

/**
 * Mark message as read.
 * 
 * @param {string} chatId 
 * @param {string} userId 
 */
export const readMessages = async (chatId, userId) => {
	await Message.updateMany({ chatId, to: userId, isRead: false }, { isRead: true })
}

/**
 * Notify chat created through websocket.
 * 
 * @param {string} message 
 * @param {string} userId 
 * @param {string} chatId 
 */
export const socketNewMessage = (messageId, userId, chatId) => {
	ChatControllerSocket.newMessage(messageId, chatId)
	UpdateControllerSocket.newMessage(messageId, userId, chatId)
}

/**
 * Count unread messages from user in a given chat
 * 
 * @param {string} chatId 
 * @param {string} userId 
 * @returns {Promise<number>}
 */
export const countMessages = async (chatId, userId) => {
	return await Message.countDocuments({ chatId, to: userId, isRead: false })
}

/**
 * @param {string} chatId 
 * @param {string} userId 
 */
export const socketReadMessages = (chatId, userId) => {
	Message.find({ chatId, to: userId, isRead: false })
		.populate("from", "socketId")
		.then((data) => {
			UpdateControllerSocket.read(data)
			ChatControllerSocket.read(data)
		})
}
