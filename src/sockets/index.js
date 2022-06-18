import { Server } from "socket.io"
import AuthMiddleware from "./middlewares/auth.middleware.js"
import ChatMiddleware from "./middlewares/chat.middleware.js"
import chatHandler from "./handlers/chat.handler.js"

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

	io.of('/chats').on("connection", chatHandler)

	return io
}