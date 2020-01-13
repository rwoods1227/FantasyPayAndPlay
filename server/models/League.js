const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//shoot gonna have to make league specific player ownage don't I :(
const LeagueSchema = new Schema({
  // user is like league creator
  comissioner:
  {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  name: {
    type: String,
    required: false,
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "team"
    }
  ],
  description: {
    type: String,
    required: false,
  },
  draftDate: {
    type: String,
    required: false,
  },
  ownedPlayers: [
    {
      type: Schema.Types.ObjectId,
      ref: "ownedPlayer"
    }
  ],

  //need to add a league association to the team model, also think about have individual instances of players for each league
});


LeagueSchema.statics.fetchLeagueTeams = LeagueId => {
  const League = mongoose.model("league");
  return League.findById(LeagueId)
    .populate("teams")
    .then(league => league.teams);
};

LeagueSchema.statics.fetchLeagueUsers = LeagueId => {
  const League = mongoose.model("league");
  return League.findById(LeagueId)
    .populate("users")
    .then(league => league.users);
};

LeagueSchema.statics.fetchLeagueOwnedPlayers = LeagueId => {
  const League = mongoose.model("league");
  return League.findById(LeagueId)
    .populate("ownedPlayers")
    .then(league => league.ownedPlayers);
};


LeagueSchema.statics.deleteTeamsAndDestroy = (leagueId) => {
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const User = mongoose.model("user");
  // may need promise stuff unsure
  let promiseArr = [];
  League.findById(leagueId).then(league => {
    User.findById(league.comissioner).then((comissioner) => {
      comissioner.leagues.pull(league);
      promiseArr.push(comissioner.save())
    })
    league.teams.forEach(teamId => {
      promiseArr.push(Team.removePlayersAndDestroy(teamId))
    });
    // console.log(promiseArr)

  })
  promiseArr.push(League.remove({ _id: leagueId }))
  return Promise.all(promiseArr).then(
    (leagueId) => console.log("complete"))
}


LeagueSchema.statics.createAllLeaguePlayers = (leagueId) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const OwnedPlayer = mongoose.model("ownedPlayer");
  // may need promise stuff unsure
        let promiseArr = [];
        Player.find({}).then(players => {
          League.findById(leagueId).then(league => {
            players.forEach(player => {
              promiseArr.push(
                new OwnedPlayer({
                  playerId: player._id,
                  leagueOwned: false,
                  leagueId: league._id
                }).save()
              );
            });
            return Promise.all(promiseArr).then(ownedPlayers => {
              console.log("made LeaguePlayers");
              ownedPlayers.forEach(ownedPlayer => {
                // console.log(ownedPlayer._id);
                league.ownedPlayers.push(ownedPlayer._id);
              });
              return league.save();
            });
          });
        });
}

module.exports = mongoose.model("league", LeagueSchema);