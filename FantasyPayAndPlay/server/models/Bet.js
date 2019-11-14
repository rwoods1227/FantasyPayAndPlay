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

  // const bet = this.findOne({ bet: betId })
  const bet = this.findById(betId);
  console.log(betId)
  console.log("bet:")
  console.log(bet)
  const betGameID = bet.scoreId;
  console.log(betGameID)
  console.log(weeklyGameScores.length);
  
  for(let i = 0; i < weeklyGameScores.length; i ++) {
    if (weeklyGameScores[i].scoreId === betGameID) {
      const thisGame = weeklyGameScores[i]
      const homeScore = thisGame.HomeScore;
      const awayScore = thisGame.AwayScore;
      let overUnder = thisGame.PregameOdds.OverUnder;
      let totalPoints = thisGame.HomeScore + thisGame.AwayScore;
      let detailsArr = bet.details.split(" ")
      let detailsArrNumber = detailsArr.pop()
      let pointSpread = Number(detailsArrNumber)

      switch (bet.wagerType) {
        case "Moneyline Away":
          if (awayScore > homeScore) {
            bet.win = 1;
            break;
          } else if (awayScore === homeScore) {
            bet.win = 0;
            break;
          } else {
            bet.win = -1;
            break;
          }
        case "Moneyline Home":
          if (homeScore > awayScore) {
            bet.win = 1;
            break;
          } else if (homeScore === awayScore) {
            bet.win = 0;
            break;
          } else {
            bet.win = -1;
            break;
          }
        case "Spread Home":
          if (pointSpread > 0) {
            let beatSpread = awayScore + pointSpread
            if (homeScore > beatSpread) {
              bet.win = 1;
              break;
            } else if (homeScore === beatSpread) {
              bet.win = 0;
              break;
            } else {
              bet.win = -1;
              break;
            }
          } else if (pointSpread < 0) {
              let beatSpread = homeScore + pointSpread
              if (awayScore > beatSpread) {
                bet.win = -1
                break;
              } else if (awayScore === beatSpread) {
                bet.win = 0
                break;
              } else {
                bet.win = 1
                break;
              }
            }       
        case "Spread Away":
          if (pointSpread > 0) {
            let beatSpread = awayScore + pointSpread
            if (homeScore < beatSpread) {
              bet.win = 1;
              break;
            } else if (homeScore === beatSpread) {
              bet.win = 0;
              break;
            } else {
              bet.win = -1;
              break;
            }
          } else if (pointSpread < 0) {
            let beatSpread = homeScore + pointSpread
            if (awayScore > beatSpread) {
              bet.win = -1
              break;
            } else if (awayScore === beatSpread) {
              bet.win = 0
              break;
            } else {
              bet.win = 1
              break;
            }
          } 

        case "Over/under Over":
          if (overUnder < totalPoints) {
            bet.win = 1;
            break
          } else if (overUnder === totalPoints) {
            bet.win = 0;
            break;
          } else {
            bet.win = -1;
            break;
          }
        case "Over/under Under":
          if (overUnder > totalPoints) {
            bet.win = 1;
            break;
          } else if (overUnder === totalPoints) {
            bet.win = 0;
            break;
          } else {
            bet.win = -1;
            break;
          }
      }
      return bet.save();
    }
  }
}

module.exports = mongoose.model("bet", BetSchema);