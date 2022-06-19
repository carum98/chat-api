import { Router } from "express"
import * as Controllers from "../controllers/contacts.controller.js"

const router = Router()

router.get('/', Controllers.get)

export default router