import { Router } from "express"
import * as Controller from "../controllers/auth.controller.js"

const router = Router()

router.post('/login', Controller.login)
router.post('/register', Controller.register)

export default router
