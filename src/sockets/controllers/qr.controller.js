import { io } from "../../index.js"

export const login = (socketId, token) => {
	io.of("/qr").to(socketId).emit("qr:login", { token })
}