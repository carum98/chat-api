import { Router } from "express"
import * as Controller from "../controllers/auth.controller.js"
import fileMiddleware from "../middlewares/file.middleware.js"

const router = Router()

router.post('/login', Controller.login)
router.post('/register', fileMiddleware, Controller.register)

export default router
