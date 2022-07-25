import "./config/env.js"

import httpServer from "./config/http.js"
import connectDB from "./config/database.js"
import socketIo from "./config/websocket.js"

(async () => {
	await connectDB()

	httpServer.listen(process.env.PORT, () => {
		console.log(`Server is running on port ${process.env.PORT}`)
	})
})()

export const io = socketIo
