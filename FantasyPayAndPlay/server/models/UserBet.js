const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// joins table

const UserBetSchema = new Schema({
  bet: {
      type: Schema.Types.ObjectId,
      ref: "bet"
    },
  user: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
  value: {
    type: Number,
    default: 0
  }
});

UserBetSchema.statics.makeUserBet = function(betId, userId, value) {
  return new this({bet: betId, user: userId, value: value}).save().then(
    (userBet) => {
      const User = mongoose.model("user");
      const Bet = mongoose.model("bet")
      const promiseArr = [];
      promiseArr.push(Bet.findById(betId).then((bet) => {
        bet.userBets.push(userBet.id)
        return bet.save()
      }))
      promiseArr.push(User.findById(userId).then((user) => {
        user.userBets.push(userBet.id)
        return user.save()
      }))
      return Promise.all(promiseArr).then(
       (returnArr) => userBet
      )
    }
  )
};

module.exports = mongoose.model("userbet", UserBetSchema);