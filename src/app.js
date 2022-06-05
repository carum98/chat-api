import express from "express"
import morgan from "morgan"

import AuthMiddleware from "./middlewares/auth.middleware.js"

import AuthRoutes from "./routes/auth.routes.js"

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use(AuthMiddleware)

app.use('/api', AuthRoutes)

export default app