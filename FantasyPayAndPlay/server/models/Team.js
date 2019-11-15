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

// this gets rid of association to players and to the user associated though the name is semi confusing
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

// TeamSchema.statics.addTeamToLeague = (teamId, leagueId) => {
//   const Team = mongoose.model("team");
//   const League = mongoose.model("league");

//   return Team.findById(teamId).then(team => {
//     console.log(team)
//     return League.findById(leagueId).then(newleague => {
//       console.log(newleague)
//       team.league = newleague;
//       newleague.teams.push(team);

//       return Promise.all([team.save(), newleague.save()]).then(
//         ([team, newleague]) => team
//       );
//     });
//   });
// };

TeamSchema.statics.removeTeamAndUserFromLeague = (teamId, LeagueId) => {
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const User = mongoose.model("user");
  let promiseArr = [];

  Team.findById(teamId).then(team => {
    User.findById(team.user).then(user => {
    if (team.league) {
      League.findById(team.league).then(league => {
        league.teams.pull(team);
        league.users.pull(user);
        user.leagues.pull(league);
        promiseArr.push(user.save());
        promiseArr.push(league.save());
        promiseArr.push(Team.removePlayersAndDestroy(teamId))
      });
    }
    });
    return Promise.all(promiseArr).then(
      () => console.log("complete")
    );
  });
};


module.exports = mongoose.model("team", TeamSchema);