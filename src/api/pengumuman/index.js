import { Router } from "express";
import PengumumanHandler from "./handler.js";
import { verifyTokenAdmin } from "../../middelwares/verifyToken.js";

const pengumumanHandler = new PengumumanHandler();

const router = Router();

router.get("/", verifyTokenAdmin, pengumumanHandler.getHandler);
router.get("/:kelas", verifyTokenAdmin, pengumumanHandler.getByKelasHandler);
router.post("/", verifyTokenAdmin, pengumumanHandler.postHandler);
router.delete("/:_id", verifyTokenAdmin, pengumumanHandler.deleteHandler);

export default router;
