import { Router } from "express"
import * as Controller from "../controllers/chat.controller.js"

const router = Router()

router.get('/', Controller.get)
router.get('/:id/messages', Controller.messages)

export default router