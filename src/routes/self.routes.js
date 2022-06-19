import { Router } from "express"
import * as Controller from "../controllers/self.controller.js"

const router = Router()

router.get("/", Controller.get)

export default router