const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  // should probably require user here
  user:
  {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
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


TeamSchema.statics.removePlayersAndDestroy= (teamId) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const User = mongoose.model("user");
  // may need promise stuff unsure
  let promiseArr = [];
  Team.findById(teamId).then(team => {
    console.log(team.name)
    User.findById(team.user).then((user) =>{
      console.log(user.email)
      user.teams.pull(team);
      promiseArr.push(user.save())
    })
    team.players.forEach(playerId => {
      Player.findById(playerId).then((player) => {
      console.log(player.name)
      player.userTeam = null;
      player.owned = false;
      promiseArr.push(player.save())
    });
  });
  // console.log(promiseArr)
  
  })
  promiseArr.push(Team.remove({ _id: teamId }))
  return Promise.all(promiseArr).then(
    (teamId) => console.log("complete"))
}

module.exports = mongoose.model("team", TeamSchema);