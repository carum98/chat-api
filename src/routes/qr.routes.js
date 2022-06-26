import { Router } from "express";
import * as QrController from "../controllers/qr.controller.js";

const router = Router()

router.get("/", QrController.get)

export default router