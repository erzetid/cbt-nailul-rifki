import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  idSiswa: String,
  idSoal: String,
  idUjian: String,
  waktuMulai: Number,
  waktuSelesai: Number,
  status: String,
  jawaban: [{ idPertanyaan: String, jawaban: String }],
});

const scoreService = mongoose.model("scores", scoreSchema);

export default class Scores {
  async save(data) {
    return new scoreService(data).save();
  }

  async getByIdSiswaAndIdUjian(idSiswa, idUjian) {
    return await scoreService.findOne({ idSiswa, idUjian });
  }

  async updateJawaban(idScore, idPertanyaan, jawaban) {}
}
