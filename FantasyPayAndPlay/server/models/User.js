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

module.exports = mongoose.model("user", UserSchema);