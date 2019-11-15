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
      ref: "team"
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
      playerID: { type: String },
      leagueOwned: { type: Boolean, default: false }
    }
  ]

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



module.exports = mongoose.model("league", LeagueSchema);