const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SkiJumpingCompetitionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  startDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const SkiJumpingCompetition = mongoose.model(
  "SkiJumpingCompetition",
  SkiJumpingCompetitionSchema
);

module.exports = SkiJumpingCompetition;
