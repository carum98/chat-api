import Chat from "../models/Chat.js"
import { countMessages } from "./messages.services.js"

import * as UpdateSocket from "../sockets/controllers/update.controller.js"

/**
 * Get chat by id.
 *  
 * @param {string} chatId 
 */
export const getChat = async (chatId) => {
	return await Chat.findById(chatId)
}

/**
 * Get all chats by user id.
 * 
 * @param {string} userId 
 */
export const getChats = async (userId) => {
	const chats = await Chat.find({ users: { $in: userId } })
		.populate("users", "name image")
		.populate("message", "id content createdAt isRead from")

	await Promise.all(
		chats.map(async chat => countMessages(chat._id, userId))
	)

	return chats.map(chat => chat.createObj(userId))
}

/**
 * Create chat. If chat already exists, return it. Otherwise, create it and return it.
 * 
 * @param {string} userTo 
 * @param {string} userFrom 
 */
export const createChat = async (userTo, userFrom) => {
	let chat = await Chat.findOne({ users: { $all: [userFrom, userTo] } })
		.populate("message", "id content createdAt isRead from")

	if (chat) {
		return chat.createObj(userFrom)
	} else {
		let data = await Chat.create({ users: [userFrom, userTo] })
		return data.createObj(userFrom)
	}
}

/**
 * Notify chat created through websocket.
 * 
 * @param {Chat} chat 
 */
export const socketChatCreated = async (chat) => {
	const data = await Chat.findById(chat.id)
		.populate("users", "name image socketId")

	UpdateSocket.newChat(data)
}