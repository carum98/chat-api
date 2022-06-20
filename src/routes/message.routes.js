import { Router } from "express"
import * as Controller from "../controllers/message.controller.js"

const router = Router()

router.post("/", Controller.create)
router.get("/:id", Controller.get)
router.put("/:id", Controller.update)

export default router