import { Router } from "express";
import UjianHandler from "./handler.js";
import {
  verifyTokenAdmin,
  verifyTokenSiswa,
  verifyTokenUmum,
} from "../../middelwares/verifyToken.js";

const ujianHandler = new UjianHandler();
const router = Router();
// TODO verify get change admin
router.get("/", verifyTokenUmum, ujianHandler.getHandler);
router.post("/", verifyTokenAdmin, ujianHandler.postHandler);
router.put("/aktifkan/:_id", verifyTokenAdmin, ujianHandler.actifHandler);
router.put("/nonaktifkan/:_id", verifyTokenAdmin, ujianHandler.nonaktifHandler);
router.delete("/:_id", verifyTokenAdmin, ujianHandler.hapusHandler);
router.get("/create_token", verifyTokenAdmin, ujianHandler.getToken);
router.get("/logs", verifyTokenAdmin, ujianHandler.getLogsHandler);
router.get(
  "/score_by_ujian/:idUjian",
  verifyTokenAdmin,
  ujianHandler.getScoresByUjian
);
router.post("/mulai", verifyTokenSiswa, ujianHandler.mulaiHandler);
router.put(
  "/update_jawaban",
  verifyTokenSiswa,
  ujianHandler.updateJawabanHandler
);
router.post(
  "/lihat_jawaban/:idScore",
  verifyTokenSiswa,
  ujianHandler.getScoreSiswaHandler
);
router.post("/pertanyaan", verifyTokenSiswa, ujianHandler.getPerSoalSiswa);
router.get("/siswa", verifyTokenSiswa, ujianHandler.getByKelasSiswaHandler);
router.get("/pre_test/:idUjian", verifyTokenSiswa, ujianHandler.preTestHandler);
router.get("/:_id", verifyTokenAdmin, ujianHandler.getByIdHandler);

export default router;
