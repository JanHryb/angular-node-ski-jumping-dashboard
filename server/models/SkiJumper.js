const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skiJumperSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  personalId: { type: Number, required: true },
});

const SkiJumper = mongoose.model("SkiJumper", skiJumperSchema);

module.exports = SkiJumper;
