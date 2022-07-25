import 'dotenv/config'
import { CreateSocket } from "./sockets/index.js"
import app from "./config/app.js"

import "./config/database.js"

export const io = CreateSocket(app)

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
