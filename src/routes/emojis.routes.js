import { Router } from "express"
import * as Controller from "../controllers/emojis.controller.js"

const router = Router()

router.get("/", Controller.get)

export default router