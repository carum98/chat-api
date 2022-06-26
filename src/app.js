import express from "express"
import morgan from "morgan"
import cors from "cors"
import { createServer } from "http"

import AuthMiddleware from "./middlewares/auth.middleware.js"

import AuthRoutes from "./routes/auth.routes.js"
import MessageRoutes from "./routes/message.routes.js"
import ChatsRoutes from "./routes/chat.routes.js"
import ContactsRoutes from "./routes/contacts.routes.js"
import SelfRoutes from "./routes/self.routes.js"
import QrRoutes from "./routes/qr.routes.js"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use(AuthMiddleware)

app.use('/admin', express.static('/app/src/public'))
app.use('/images', express.static('/app/uploads'))

app.use('/api', AuthRoutes)
app.use('/api/messages', MessageRoutes)
app.use('/api/chats', ChatsRoutes)
app.use('/api/contacts', ContactsRoutes)
app.use('/api/self', SelfRoutes)
app.use('/api/qr', QrRoutes)

export default createServer(app)