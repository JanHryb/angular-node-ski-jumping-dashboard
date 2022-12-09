const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const skiJumperListSchema = new Schema({
  skiJumpingCompetitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkiJumpingCompetition",
  },
  skiJumperId: { type: mongoose.Schema.Types.ObjectId, ref: "SkiJumper" },
});

const SkiJumperList = mongoose.model("SkiJumperList", skiJumperListSchema);

module.exports = SkiJumperList;
