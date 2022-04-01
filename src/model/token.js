import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: String,
});

const tokenService = mongoose.model("tokens", tokenSchema);

export default class Tokens {
  async set() {
    const token = this.makeid();
    const checkToken = await tokenService.find().lean();
    if (checkToken.length) {
      return await tokenService.findByIdAndUpdate(
        checkToken[0]._id.toString(),
        { $set: { token } },
        { new: true }
      );
    }
    return await new tokenService({ token }).save();
  }
  makeid() {
    const length = 5;
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
