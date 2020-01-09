const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// draft list of players with ranks tied to a team
const DraftListSchema = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: "player",
    required: false
  },
  rank: {
    type: Number,
    default: false
  },
  team:
    {
      type: Schema.Types.ObjectId,
      ref: "team"
    }
});

module.exports = mongoose.model("draftList", DraftListSchema);
