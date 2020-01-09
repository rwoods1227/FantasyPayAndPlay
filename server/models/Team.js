const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  league: {
    type: Schema.Types.ObjectId,
    ref: "league",
    required: true
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "player"
    }
  ],
  // going to be populated by Player({}) filtered by averageDraftPosition and filled
  preDraftPlayerRankings: [
    {
      type: Schema.Types.ObjectId,
      ref: "draftList"
    }
  ]
});


TeamSchema.statics.fetchTeamPreDraftPlayerRankings = TeamId => {
  const Team = mongoose.model("team");
  return Team.findById(TeamId)
    .populate("preDraftPlayerRankings")
    .then(team => team.preDraftPlayerRankings);
};

TeamSchema.statics.fetchTeamPlayers = TeamId => {
  const Team = mongoose.model("team");
  return Team.findById(TeamId)
    .populate("players")
    .then(team => team.players);
};

// this gets rid of association to players and to the user associated though the name is semi-confusing
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
  });
  return Promise.all(promiseArr).then(
  () => console.log("complete"));
};

TeamSchema.statics.createDraftListRankings = teamId => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const DraftList = mongoose.model("draftList");
  // may need promise stuff unsure
  let promiseArr = [];
  Player.find({}).then(players => {
    let semiSortedPlayers = players.sort((a, b) => (!a.averageDraftPosition  || a.averageDraftPosition > b.averageDraftPosition) ? 1 : -1);
    let noNullPlayers = [];
    let nullPlayers = [];
    semiSortedPlayers.forEach((player =>{
      if (!player.averageDraftPosition){
        nullPlayers.push(player)
      }
      else{
        noNullPlayers.push(player)
      }
    }))
    let sortedPlayers = noNullPlayers.concat(nullPlayers);
    

    Team.findById(teamId).then(team => {
      let i = 1;
      sortedPlayers.forEach(player => {
      
        promiseArr.push(
          new DraftList({
            playerId: player._id,
            rank: i,
            team: team._id
          }).save()
        );
        i+=1;
      });
      return Promise.all(promiseArr).then(draftListPlayers => {
        // console.log(draftListPlayers);
        // console.log("finish?");
        // console.log(team);
        draftListPlayers.forEach(preDraftPlayerRanking => {
          //  console.log(preDraftPlayerRanking);
          team.preDraftPlayerRankings.push(preDraftPlayerRanking);
        });
        return team.save();
      });
    });
  });
};


module.exports = mongoose.model("team", TeamSchema);