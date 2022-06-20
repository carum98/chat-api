import { Server } from "socket.io"
import AuthMiddleware from "./middlewares/auth.middleware.js"

import ChatMiddleware from "./middlewares/chat.middleware.js"
import UpdatesMiddleware from "./middlewares/updates.middleware.js"

import chatHandler from "./handlers/chat.handler.js"
import updatesHandler from "./handlers/updates.handler.js"

export const CreateSocket = (httpServer) => {
	const io = new Server(httpServer, {
		serveClient: true,
		cors: {
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization", "Accept"],
		}
	});

	io.of('/chats').use(AuthMiddleware)
	io.of('/chats').use(ChatMiddleware)

	io.of('/updates').use(AuthMiddleware)
	io.of('/updates').use(UpdatesMiddleware)

	io.of('/chats').on("connection", chatHandler)
	io.of('/updates').on("connection", updatesHandler)

	return io
}