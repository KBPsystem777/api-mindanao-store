const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: String },
    active: { type: Boolean },
    email: { type: String, trim: true, required: true, unique: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlenght: 3,
    },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    stores: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
