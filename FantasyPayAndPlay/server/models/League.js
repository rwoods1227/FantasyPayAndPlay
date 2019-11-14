const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//shoot gonna have to make league specific player ownage don't I :(
const LeagueSchema = new Schema({
  // user is like league creator
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

  //need to add a league association to the team model, also think about have individual instances of players for each league
});


LeagueSchema.statics.fetchLeagueTeams = LeagueId => {
  const League = mongoose.model("league");
  return League.findById(LeagueId)
    .populate("players")
    .then(league => league.players);
};

LeagueSchema.statics.deleteTeamsAndDestroy = (leagueId) => {
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const User = mongoose.model("user");
  // may need promise stuff unsure
  let promiseArr = [];
  League.findById(leagueId).then(league => {
    User.findById(league.user).then((user) => {
      user.leagues.pull(league);
      promiseArr.push(user.save())
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