import Message from "../models/Message.js"

import * as UpdateControllerSocket from "../sockets/controllers/update.controller.js"
import * as ChatControllerSocket from "../sockets/controllers/chat.controller.js"

/**
 * @param {string} chatId 
 */
export const getMessages = async (chatId) => {
	return await Message.find({ chatId }).sort({ createdAt: -1 })
}

/**
 * @param {string} chatId 
 * @param {string} userId 
 */
export const readMessages = async (chatId, userId) => {
	await Message.updateMany({ chatId, to: userId, isRead: false }, { isRead: true })
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