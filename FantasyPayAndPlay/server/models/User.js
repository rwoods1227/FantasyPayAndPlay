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
  userBet: [
    {
      type: Schema.Types.ObjectId,
      ref: "userbet"
    }
  ]
});

// UserSchema.statics.fetchUserBets = UserId => {
//   const User = mongoose.model("user");
//   return User.findById(UserId)
//     .populate("bets")
//     .then(user => user.bets);
// };

module.exports = mongoose.model("user", UserSchema);