import { Server } from "socket.io"
import AuthMiddleware from "../sockets/middlewares/auth.middleware.js"

import ChatMiddleware from "../sockets/middlewares/chat.middleware.js"
import UpdatesMiddleware from "../sockets/middlewares/updates.middleware.js"

import chatHandler from "../sockets/handlers/chat.handler.js"
import updatesHandler from "../sockets/handlers/updates.handler.js"

import qrHandler from "../sockets/handlers/qr.handler.js"

import httpServer from "./http.js"

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
io.of('/qr').on("connection", qrHandler)

export default io