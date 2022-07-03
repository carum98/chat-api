import { Router } from "express";
import * as QrController from "../controllers/qr.controller.js";

const router = Router()

router.post("/", QrController.get)
router.post("/validate", QrController.validate)

export default router