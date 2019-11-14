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
  league:
  {
    type: Schema.Types.ObjectId,
    ref: "league",
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
    User.findById(team.user).then((user) =>{
      user.teams.pull(team);
      promiseArr.push(user.save())
    })
    team.players.forEach(playerId => {
      Player.findById(playerId).then((player) => {
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

TeamSchema.statics.addteamToLeague = (teamId, leagueId) => {
  const Team = mongoose.model("team");
  const League = mongoose.model("league");

  return Team.findById(teamId).then(team => {
    return League.findById(leagueId).then(newleague => {
      team.league = newleague;
      newleague.teams.push(team);

      return Promise.all([team.save(), newleague.save()]).then(
        ([team, newleague]) => team
      );
    });
  });
};

TeamSchema.statics.removeAndDeleteTeamFromLeague = (teamId, LeagueId) => {
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  let promiseArr = [];

  Team.findById(teamId).then(team => {
    if (team.league) {
      // find the old League and remove this team from it's teams
      League.findById(team.league).then(league => {
        league.teams.pull(team);
        promiseArr.push(league.save());
        promiseArr.push(Team.removePlayersAndDestroy(teamId))
      });
    }
    //return team to available teams field
    return Promise.all(promiseArr).then(
      () => console.log("complete")
    );
  });
};


module.exports = mongoose.model("team", TeamSchema);