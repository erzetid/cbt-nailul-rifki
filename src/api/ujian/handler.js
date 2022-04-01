import Ujian from "../../model/ujian.js";
import BaseHandler from "../default.js";
import mongoose from "mongoose";
import Tokens from "../../model/token.js";

export default class UjianHandler extends BaseHandler {
  service = new Ujian();
  tokenService = new Tokens();
  constructor() {
    super();
    this.getHandler = this.getHandler.bind(this);
    this.postHandler = this.postHandler.bind(this);
    this.actifHandler = this.actifHandler.bind(this);
    this.nonaktifHandler = this.nonaktifHandler.bind(this);
    this.hapusHandler = this.hapusHandler.bind(this);
    this.getByIdHandler = this.getByIdHandler.bind(this);
    this.getToken = this.getToken.bind(this);
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
      const { idUjian, idSiswa, namaUjian, namaSiswa } = req.params;
      if (!mongoose.isValidObjectId(idUjian))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });
      if (!mongoose.isValidObjectId(idSiswa))
        return super.render(res, 400, {
          status: "error",
          message: "Id ujian tidak boleh kosong!",
        });

      // const data = await this.service.getById(idUjian);
      // if (!data)
      //   return super.render(res, 400, {
      //     status: "error",
      //     message: "Ujian tidak ditemukan!",
      //   });
      return super.render(res, 200, {
        status: "success",
        message: "Log masuk berhasil!",
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
