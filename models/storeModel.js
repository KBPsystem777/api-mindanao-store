const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    _id: { type: String },
    active: { type: Boolean },
    store_name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      trim: true,
    },
    store_email: { type: String, minlength: 4, unique: true },
    mobile: { type: String, minlength: 8, required: true },
    store_address: { type: String, required: true },
    store_owner_username: { type: String },
    store_owner_id: { type: String },
    store_owner_email: { type: String, required: true },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
