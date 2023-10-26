const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userCode: {
      type: String,
      unique: true,
    },
    password: { type: String },
    token: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
