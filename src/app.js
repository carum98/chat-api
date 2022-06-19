import express from "express"
import morgan from "morgan"
import cors from "cors"
import { createServer } from "http"

import AuthMiddleware from "./middlewares/auth.middleware.js"

import AuthRoutes from "./routes/auth.routes.js"
import MessageRoutes from "./routes/message.routes.js"
import ChatsRoutes from "./routes/chat.routes.js"
import ContactsRoutes from "./routes/contacts.routes.js"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use(AuthMiddleware)

app.use('/admin', express.static('/app/src/public'))

app.use('/api', AuthRoutes)
app.use('/api/messages', MessageRoutes)
app.use('/api/chats', ChatsRoutes)
app.use('/api/contacts', ContactsRoutes)


export default createServer(app)