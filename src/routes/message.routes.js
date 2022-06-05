import { Router } from "express"
import * as Controller from "../controllers/message.controller.js"

const router = Router()

router.get("/", Controller.get)
router.post("/", Controller.create)
router.put("/:id", Controller.update)

export default router