import { Router } from "express";
import UjianHandler from "./handler.js";
import { verifyTokenAdmin } from "../../middelwares/verifyToken.js";

const ujianHandler = new UjianHandler();
const router = Router();
router.get("/", verifyTokenAdmin, ujianHandler.getHandler);
router.post("/", verifyTokenAdmin, ujianHandler.postHandler);
router.put("/aktifkan/:_id", verifyTokenAdmin, ujianHandler.actifHandler);
router.put("/nonaktifkan/:_id", verifyTokenAdmin, ujianHandler.nonaktifHandler);
router.delete("/:_id", verifyTokenAdmin, ujianHandler.hapusHandler);
router.get("/:_id", verifyTokenAdmin, ujianHandler.getByIdHandler);

export default router;
