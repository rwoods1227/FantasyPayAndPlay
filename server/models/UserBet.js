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
  },
  payout: {
    type: Boolean,
    default: false
  }
});

UserBetSchema.statics.makeUserBet = function(betId, userId, value) {
  if (value > 0) { 

    let testTime = mongoose.model("user");
    testTime.findById(userId).then(theUser => {

      if (theUser.balance > value) {
        return new this({ bet: betId, user: userId, value: value }).save().then(
          (userBet) => {
            const User = mongoose.model("user");
            const Bet = mongoose.model("bet")
            const promiseArr = [];
            promiseArr.push(Bet.findById(betId).then((bet) => {
              bet.userBets.push(userBet.id)
              return bet.save()
            }))
            promiseArr.push(User.findById(userId).then((user) => {
              user.balance = user.balance - value
              user.userBets.push(userBet.id)
              return user.save()
            }))
            return Promise.all(promiseArr).then(
              (returnArr) => userBet
            )
          }
        )
      }
    })


    
  }
};

// change context to get userBet? best way to access bet.userBet?
// return user or userBet when mutating user balance?

UserBetSchema.statics.updateTheUserBalance = function(betId, userId) {
  const User = mongoose.model("user");
  const Bet = mongoose.model("bet");
  const UserBet = mongoose.model("userbet");

  const promiseArr = [];
  promiseArr.push(this.findOne({ bet: betId }));
  promiseArr.push(User.findById(userId));
  promiseArr.push(Bet.findById(betId));
  return Promise.all(promiseArr).then(([userBet, user, bet]) => {
    // user.balance = Math.ceil(user.balance - userBet.value)
    if (bet.win === -1) {
      // user.balance = Math.ceil(user.balance - userBet.value);
      userBet.payout = true;
      return userBet.save()
    } else if (bet.win === 2) {
      user.balance = Math.ceil(user.balance + userBet.value);
      userBet.payout = true;
      return userBet.save();
    } else {
      const moneyLineBet = bet.line;
      const betValue = userBet.value;
      let calculateWinnings;
      if (moneyLineBet > 0) {
        calculateWinnings = (100 / moneyLineBet) * 1.0 * betValue;
        user.balance = Math.ceil(user.balance + betValue + calculateWinnings);
      } else if (moneyLineBet < 0) {
        calculateWinnings = (100 / moneyLineBet) * -1.0 * betValue;
        user.balance = Math.ceil(user.balance + betValue + calculateWinnings);
      }
    }
    return user.save().then(() => {
      userBet.payout = true;
      return userBet.save();
    });
  });
};

module.exports = mongoose.model("userbet", UserBetSchema);