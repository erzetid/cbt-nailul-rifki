import { Router } from "express";
import KelasHandler from "./handler.js";
import { verifyTokenAdmin } from "../../middelwares/verifyToken.js";

const kelasHandler = new KelasHandler();

const router = Router();

router.get("/", verifyTokenAdmin, kelasHandler.getHandler);
router.post("/", verifyTokenAdmin, kelasHandler.postHandler);
router.put("/", verifyTokenAdmin, kelasHandler.putHandler);

export default router;
