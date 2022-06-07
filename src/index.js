import 'dotenv/config'
import { CreateSocket } from "./sockets/index.js"
import app from "./app.js"

import "./database.js"

export const io = CreateSocket(app)

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
