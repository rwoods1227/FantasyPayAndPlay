const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const axios = require("axios");
const NFLKey = require("../../config/keys").NFLKey;

const BetSchema = new Schema({
  userBets: [
    {
      type: Schema.Types.ObjectId,
      ref: "userbet"
    }
  ],
  description: {
    type: String,
    required: false,
  },
  details: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  wagerType: {
    type: String,
    required: false,
  },
  line: {
    type: Number,
    required: false,
  },
  scoreId: {
    type: Number,
    required: false,
  },
  win: {
    type: Number,
    default: 0
 }
});

BetSchema.statics.fetchBetsUserBets = BetId => {
  const Bet = mongoose.model("bet");
  return Bet.findById(BetId)
    .populate("userBets")
    .then(bet => bet.userBets);
};

BetSchema.statics.changeWinValue = function(betId) {
  const Bet = mongoose.model("bet")
  const weeklyGameScores = {
    method: "GET",
    url: "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2019/10",
    headers: {
      "Ocp-Apim-Subscription-Key": NFLKey
    }
  };

  // const promiseArr = [];
  // promiseArr.push(this.findOne({ bet: betId }));
  // const betGameID = promiseArr[0].scoreId
  const bet = this.findOne({ bet: betId })
  const betGameID = bet.scoreId;
  
  for(let i = 0; i < weeklyGameScores.length; i ++) {
    if (weeklyGameScores[i].scoreId === betGameID) {
      // switch() {
      //   case:

      //   case:

      //   case:
      // }
    }
  }


  // promiseArr.push(weeklyGameScores.findOne({ scoreId: betGameID }));
  // return promiseArr
  return Promise.all(promiseArr).then(([bet, game]) => {
    
  })


  //  promiseArr.push(User.findById(userId));
  //  promiseArr.push(Bet.findById(betId));
  //  return Promise.all(promiseArr).then(([userBet, user, bet]) => {
  //    if (bet.win === -1) {
  //      user.balance = user.balance - userBet.value;
  //    } else if (bet.win === 0) {
  //      userBet.payout = true;
  //      return userBet.save();
  //    } else {
  //      const moneyLineBet = bet.line;
  //      const betValue = userBet.value;
  //      const calculateWinnings = (100 / moneyLineBet) * 1.0 * betValue;
  //      user.balance = user.balance + calculateWinnings;
  //    }
  //    return user.save().then(() => {
  //      userBet.payout = true;
  //      return userBet.save();
  //    });
  //  });
}

module.exports = mongoose.model("bet", BetSchema);