import Ujian from "../../model/ujian.js";
import Logs from "../../model/log.js";
import BaseHandler from "../default.js";
import mongoose from "mongoose";
import Tokens from "../../model/token.js";
import Siswas from "../../model/siswa.js";
import Soals from "../../model/soal.js";
import Scores from "../../model/score.js";
import jwt from "jsonwebtoken";

export default class UjianHandler extends BaseHandler {
  service = new Ujian();
  tokenService = new Tokens();
  siswaService = new Siswas();
  soalService = new Soals();
  logs = new Logs();
  scoreService = new Scores();
  constructor() {
    super();
    this.getHandler = this.getHandler.bind(this);
    this.postHandler = this.postHandler.bind(this);
    this.actifHandler = this.actifHandler.bind(this);
    this.nonaktifHandler = this.nonaktifHandler.bind(this);
    this.hapusHandler = this.hapusHandler.bind(this);
    this.getByIdHandler = this.getByIdHandler.bind(this);
    this.getToken = this.getToken.bind(this);
    this.mulaiHandler = this.mulaiHandler.bind(this);
  }
  async getHandler(_req, res, _next) {
    try {
      const data = await this.service.getAll();
      return super.render(res, 200, {
        status: "success",
        message: "Ujian berhasil dirender!",
        data,
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }

  async postHandler(req, res) {
    const { nama, idKelas, durasi, idSoal, status, waktuMulai } = req.body;
    if (typeof nama !== "string" || nama === "")
      return super.render(res, 400, {
        status: "error",
        message: "Nama tidak boleh kosong!",
      });
    if (
      typeof idKelas !== "string" ||
      idKelas === "" ||
      !mongoose.isValidObjectId(idKelas)
    )
      return super.render(res, 400, {
        status: "error",
        message: "Id kelas tidak boleh kosong!",
      });
    if (
      typeof idSoal !== "string" ||
      idSoal === "" ||
      !mongoose.isValidObjectId(idSoal)
    )
      return super.render(res, 400, {
        status: "error",
        message: "Id soal tidak boleh kosong!",
      });
    if (typeof waktuMulai !== "string" || waktuMulai === "")
      return super.render(res, 400, {
        status: "error",
        message: "Waktu mulai tidak boleh kosong!",
      });
    if (typeof durasi !== "number" || durasi < 10)
      return super.render(res, 400, {
        status: "error",
        message: "Durasi minimal 10 menit!",
      });
    const data = await this.service.save({
      nama,
      idKelas,
      durasi,
      idSoal,
      status: "nonaktif",
      waktuMulai,
    });
    try {
      return super.render(res, 200, {
        status: "success",
        message: "Ujian berhasil disimpan!",
        data,
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }

  async actifHandler(req, res) {
    try {
      const { _id } = req.params;
      if (!mongoose.isValidObjectId(_id))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });
      const data = await this.service.update(_id, { status: "aktif" });
      if (!data || (data && data.status !== "aktif"))
        return super.render(res, 400, {
          status: "error",
          message: "Gagal mengaktifkan ujian!",
        });
      return super.render(res, 200, {
        status: "success",
        message: "Ujian berhasil diaktifkan!",
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }
  async nonaktifHandler(req, res) {
    try {
      const { _id } = req.params;
      if (!mongoose.isValidObjectId(_id))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });
      const data = await this.service.update(_id, { status: "nonaktif" });
      if (!data || (data && data.status !== "nonaktif"))
        return super.render(res, 400, {
          status: "error",
          message: "Gagal menonaktifkan ujian!",
        });
      return super.render(res, 200, {
        status: "success",
        message: "Ujian berhasil dinonaktifkan!",
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }
  async hapusHandler(req, res) {
    try {
      const { _id } = req.params;
      if (!mongoose.isValidObjectId(_id))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });
      const data = await this.service.deleteById(_id);
      if (!data)
        return super.render(res, 400, {
          status: "error",
          message: "Ujian tidak ditemukan!",
        });
      return super.render(res, 200, {
        status: "success",
        message: "Ujian berhasil dihapus!",
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }
  async getByIdHandler(req, res) {
    try {
      const { _id } = req.params;
      if (!mongoose.isValidObjectId(_id))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });
      const data = await this.service.getById(_id);
      if (!data)
        return super.render(res, 400, {
          status: "error",
          message: "Ujian tidak ditemukan!",
        });
      return super.render(res, 200, {
        status: "success",
        message: "Ujian ditemukan!",
        data,
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }

  async mulaiHandler(req, res) {
    try {
      const { idUjian, token } = req.body;
      if (typeof token !== "string" || token === "")
        return super.render(res, 400, {
          status: "error",
          message: "Token tidak boleh kosong!",
        });

      if (!mongoose.isValidObjectId(idUjian))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });

      let jwtToken = req.headers.authorization;
      if (!jwtToken)
        return res.status(401).json({
          status: "error",
          message: "Access Denied / Unauthorized request",
        });
      jwtToken = jwtToken.split(" ")[1];
      const { idUser: idSiswa } = jwt.decode(jwtToken);

      const { nama: namaSiswa, kelas: kelasSiswa } =
        await this.siswaService.getById(idSiswa);
      if (!namaSiswa)
        return res.status(400).json({
          status: "error",
          message: "Siswa tidak ditemukan!",
        });

      const {
        nama: namaUjian,
        idKelas: kelasUjian,
        status,
        idSoal,
      } = await this.service.getById(idUjian);
      if (!namaUjian)
        return res.status(400).json({
          status: "error",
          message: "Ujian tidak ditemukan!",
        });
      if (kelasUjian !== kelasSiswa)
        return res.status(400).json({
          status: "error",
          message: "Kamu tidak diperbolehkan untuk mengerjakan ujian ini!",
        });
      if (status !== "aktif")
        return res.status(400).json({
          status: "error",
          message: "Ujian belum diaktifkan!",
        });
      const checkToken = await this.tokenService.check(token);
      if (!checkToken)
        return super.render(res, 400, {
          status: "error",
          message: "Token tidak valid!",
        });
      const checkLog = await this.logs.getByIdSiswaAndIdUjian(idSiswa, idUjian);
      if (checkLog)
        return super.render(res, 400, {
          status: "error",
          message: "Siswa sedang mengerjakan ujian!",
        });

      const dataSoal = await this.soalService.getById(idSoal);
      if (!dataSoal)
        return super.render(res, 400, {
          status: "error",
          message: "Soal ujian tidak ditemukan!",
        });
      const jawaban = dataSoal.butir.map((x) => {
        return { idPertanyaan: x._id.toString(), jawaban: "" };
      });

      const checkScore = await this.scoreService.getByIdSiswaAndIdUjian(
        idSiswa,
        idUjian
      );
      const waktuMulai = new Date().getTime();
      if (!checkScore) {
        if (
          !(await this.scoreService.save({
            idSiswa,
            idSoal,
            idUjian,
            waktuMulai,
            waktuSelesai: 0,
            status: "aktif",
            jawaban,
          }))
        )
          return super.render(res, 400, {
            status: "success",
            message: "Mulai ujian error!",
          });
      }
      if (
        !(await this.logs.save({
          idUjian,
          idSiswa,
          namaUjian,
          namaSiswa,
        }))
      )
        return res.status(400).json({
          status: "error",
          message: "Maaf ada yang salah!",
        });
      return super.render(res, 200, {
        status: "success",
        message: "Berhasil!",
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }

  async getToken(_req, res) {
    try {
      const data = await this.tokenService.set();
      if (!data)
        return super.render(res, 400, {
          status: "error",
          message: "Gagal memperbarui token gagal!",
        });
      return super.render(res, 200, {
        status: "success",
        message: "Token berhasil diperabrui!",
        data,
      });
    } catch (error) {
      console.log(error);
      return super.render(res, 500, {
        status: "error",
        message: "Mohon maaf, kesalahan server!",
      });
    }
  }
}
