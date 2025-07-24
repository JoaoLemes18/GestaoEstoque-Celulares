import { Router } from "express";
import * as controller from "../controller/deviceController";

const router = Router();

router.get("/devices", controller.getDevices);
router.post("/devices", controller.createDevice);
router.delete("/devices/:imei", controller.removeDevice);

export default router;
