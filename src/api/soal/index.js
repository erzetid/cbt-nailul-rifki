import { Router } from "express";
import SoalHandler from "./handler.js";

const soalHandler = new SoalHandler();
const router = Router();

router.get("/", soalHandler.getHandler);
router.get("/:_id", soalHandler.getByIdhandler);
router.get("/per_soal/:_id", soalHandler.getPerSoal);
router.post("/", soalHandler.postHandler);
router.delete("/:_id", soalHandler.deleteHandler);

export default router;
