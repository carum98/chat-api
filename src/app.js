import express from "express"
import morgan from "morgan"

import AuthMiddleware from "./middlewares/auth.middleware.js"

import AuthRoutes from "./routes/auth.routes.js"
import MessageRoutes from "./routes/message.routes.js"

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use(AuthMiddleware)

app.use('/api', AuthRoutes)
app.use('/api/messages', MessageRoutes)

export default app