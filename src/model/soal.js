import mongoose from "mongoose";

const soalSchema = new mongoose.Schema({
  nama: String,
  butir: [{ soal: String, pilihan: [{ opsi: String }], jawaban: String }],
  jumlah: Number,
  diperbarui: Date,
});

const soalService = mongoose.model("soals", soalSchema);

export default class Soals {
  service = soalService;

  async simpan(nama, jumlah, jumlahOpsi) {
    const butir = [];
    const pilihan = [];
    for (let index = 0; index < jumlahOpsi; index++) {
      pilihan.push({ opsi: "" });
    }
    const objButir = { pilihan, soal: "", jawaban: "" };

    for (let index = 0; index < jumlah; index++) {
      butir.push(objButir);
    }
    const newSoal = new this.service({
      nama,
      jumlah,
      butir,
      diperbarui: new Date(),
    });
    const query = await newSoal.save();
    if (!query) {
      throw new Error("Gagal menyimpan soal!");
    }
    return query;
  }

  async editButirSoal(_idButirSoal, soal) {
    const query = await this.service.findOneAndUpdate(
      { "butir._id": _idButirSoal },
      {
        $set: {
          "butir.$.soal": soal,
        },
      },
      { new: true }
    );

    return query;
  }

  async editJawabanSoal(_idButirSoal, jawaban) {
    const query = await this.service.findOneAndUpdate(
      { "butir._id": _idButirSoal },
      {
        $set: {
          "butir.$.jawaban": jawaban,
        },
      },
      { new: true }
    );
    return query;
  }

  async editOpsi(_idOpsi, opsi) {
    const query = await this.service.findOneAndUpdate(
      { "butir.pilihan._id": _idOpsi },

      {
        $set: {
          "butir.$.pilihan.$[j].opsi": opsi,
        },
      },
      {
        arrayFilters: [
          {
            "j._id": {
              $eq: _idOpsi,
            },
          },
        ],
      }
    );
    return query;
  }

  async hapus(_id) {
    const query = await this.service.findByIdAndDelete(_id);
    return query;
  }

  async getAll() {
    const query = await this.service.find();

    return query;
  }

  async getById(_id) {
    const query = await this.service.findById(_id);

    return query;
  }

  async getById(_id) {
    const query = await this.service.findById(_id);

    return query;
  }

  async getPerSoal(_id) {
    const query = await this.service.aggregate([
      { $match: { "butir._id": mongoose.Types.ObjectId(_id) } },
      {
        $project: {
          _id: 1,
          butir: {
            $filter: {
              input: "$butir",
              as: "idButir",
              cond: { $eq: ["$$idButir._id", mongoose.Types.ObjectId(_id)] },
            },
          },
        },
      },
    ]);
    if (query.length) {
      return query[0].butir[0];
    }
    return null;
  }
}
