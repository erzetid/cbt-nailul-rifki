import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  idUser: String,
  username: String,
  password: String,
  role: String,
  refreshToken: String,
});

const userService = mongoose.model("users", userSchema);

export default class Users {
  service = userService;

  async simpan(siswa, username, password, role) {
    const checkUsername = await this.getUsername(username);
    if (checkUsername) {
      throw new Error("username tidak tersedia!");
    }
    const userBaru = new this.service({ siswa, username, password, role });
    const query = await userBaru.save();

    return query;
  }

  async getById(_id) {
    const query = await this.service.findById(_id);

    return query;
  }

  async getAll() {
    const query = await this.service.find();

    return query;
  }

  async edit(_id, data) {
    const query = await this.service.findByIdAndUpdate(
      _id,
      { $set: data },
      { new: true }
    );

    return query;
  }

  async setRefresToken(_id, refreshToken) {
    const query = await this.service.findByIdAndUpdate(
      _id,
      { $set: { refreshToken } },
      { new: true }
    );

    return query;
  }

  async getRefreshToken(refreshToken) {
    const query = await this.service.findOne({ refreshToken });

    return query;
  }

  async getBySiswa(siswa) {
    const query = await this.service.findOne({ siswa });

    return query;
  }

  async hapus(_id) {
    const query = await this.service.findByIdAndDelete(_id);

    return query;
  }

  async hapusByIdSiswa(siswa) {
    const query = await this.service.deleteOne({ siswa });

    return query;
  }

  async getUsername(username) {
    const query = await this.service.findOne({ username });

    return query;
  }

  async simpanAdmin(username, password) {
    const checkUsername = await this.getUsername(username);
    if (checkUsername) {
      throw new Error("username tidak tersedia!");
    }
    const userBaru = new this.service({ username, password, role: "admin" });
    return await userBaru.save();
  }
}
