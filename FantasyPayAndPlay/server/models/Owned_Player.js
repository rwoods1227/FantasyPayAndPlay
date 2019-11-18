const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//shoot gonna have to make league specific player ownage don't I :(
const OwnedPlayerSchema = new Schema({
  playerId:{
    type: Schema.Types.ObjectId,
    ref: "player",
    required: false
  },
  leagueId: {
    type: Schema.Types.ObjectId,
    ref: "league",
    required: false
  },
  leagueOwned: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("ownedPlayer", OwnedPlayerSchema);