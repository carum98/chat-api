import { Server } from "socket.io"
import AuthMiddleware from "./middlewares/auth.middleware.js"
import chatHandler from "./handlers/chat.handler.js";

export const CreateSocket = (httpServer) => {
	const io = new Server(httpServer, {
		serveClient: true,
	});

	io.of('/chats').use(AuthMiddleware)

	const onChatConnection = (socket) => {
		chatHandler(io, socket)
	}

	io.of('/chats').on("connection", onChatConnection)
}