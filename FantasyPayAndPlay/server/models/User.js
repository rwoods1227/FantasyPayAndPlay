const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  balance: {
    type: Number,
    default: 10000
  },
  userBets: [
    {
      type: Schema.Types.ObjectId,
      ref: "userbet"
    }
  ],
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "team"
    }
  ],
  leagues: [
    {
      type: Schema.Types.ObjectId,
      ref: "league"
    }
  ],
});

UserSchema.statics.fetchUsersUserBets = UserId => {
  const User = mongoose.model("user");
  return User.findById(UserId)
    .populate("userBets")
    .then(user => user.userBets);
};

UserSchema.statics.fetchUsersTeams = UserId => {
  const User = mongoose.model("user");
  return User.findById(UserId)
    .populate("teams")
    .then(user => user.teams);
};

UserSchema.statics.fetchUsersLeagues = UserId => {
  const User = mongoose.model("user");
  return User.findById(UserId)
    .populate("leagues")
    .then(user => user.leagues);
};

UserSchema.statics.addUserToLeagueAndCreateTeam = (userId, leagueId) => {
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const User = mongoose.model("user");
  let promiseArr = []

  User.findById(userId).then(user => {
    console.log(user)
    let newTeam = new Team({ name:`${user.name}'s Team`,
    description: "",
    user: user._id,
    league:leagueId });
    console.log(newTeam) 
    user.teams.push(newTeam);

      League.findById(leagueId).then(newleague => {
        console.log(newleague)
        newTeam.league = newleague;
        newleague.teams.push(newTeam);
        user.league = newleague;
        newleague.users.push(user) = newleague;
        promiseArr.push(newTeam.save());
        promiseArr.push(user.save());
        promiseArr.push(league.save())
      return Promise.all(promiseArr).then(
        ([user]) => user
      );
    });
  });
};


module.exports = mongoose.model("user", UserSchema);