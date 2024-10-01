const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    bio: String,
  },
  {
    timestamps: true, // marcador de tempo de criação ou edição
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User