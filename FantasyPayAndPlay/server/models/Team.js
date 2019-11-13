const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  user:
  {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: false,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "player"
    }
  ],
  description: {
    type: String,
    required: false,
  }

  // eventually a league association here 
});


TeamSchema.statics.fetchTeamPlayers = TeamId => {
  const Team = mongoose.model("team");
  return Team.findById(TeamId)
    .populate("players")
    .then(team=> team.players);
};

module.exports = mongoose.model("team", TeamSchema);