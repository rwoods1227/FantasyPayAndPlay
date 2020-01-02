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
  const weeklyGameScoresAPI = {
    method: "GET",
    url: "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2019/12",
    headers: {
      "Ocp-Apim-Subscription-Key": NFLKey
    }
  };

  return axios(weeklyGameScoresAPI).then(res => {
    return res.data
  }).then(gameData => {
    const weeklyGameScores = gameData
    Bet.findById(betId).then((bet) => {
      const betGameID = bet.scoreId;
      // console.log("1")
      // console.log(weeklyGameScores.length)
      for(let i = 0; i < weeklyGameScores.length; i++) {
        // console.log(i)
        // console.log(weeklyGameScores[i].ScoreID);
        // console.log(betGameID)
        if (weeklyGameScores[i].ScoreID === betGameID) {
          const thisGame = weeklyGameScores[i]
          const homeScore = thisGame.HomeScore;
          const awayScore = thisGame.AwayScore;
          let overUnder = thisGame.OverUnder;
          let totalPoints = thisGame.HomeScore + thisGame.AwayScore;
          let detailsArr;
          let detailsArrNumber;
          let pointSpread;
          // console.log(bet.details)
          // console.log("here")
    
          switch (bet.wagerType) {
            case "Moneyline Away":
              if (awayScore > homeScore) {
                bet.win = 1;
                break;
              } else if (awayScore === homeScore) {
                bet.win = 2;
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
                bet.win = 2;
                break;
              } else {
                bet.win = -1;
                break;
              }
            case "Spread Home":
              detailsArr = bet.details.split(" ");
              detailsArrNumber = detailsArr.pop();
              pointSpread = Number(detailsArrNumber);
              if (pointSpread > 0) {
                let beatSpread = awayScore + pointSpread
                if (homeScore > beatSpread) {
                  bet.win = 1;
                  break;
                } else if (homeScore === beatSpread) {
                  bet.win = 2;
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
                    bet.win = 2
                    break;
                  } else {
                    bet.win = 1
                    break;
                  }
                }       
            case "Spread Away":
              detailsArr = bet.details.split(" ");
              detailsArrNumber = detailsArr.pop();
              pointSpread = Number(detailsArrNumber);
              if (pointSpread > 0) {
                let beatSpread = awayScore + pointSpread
                if (homeScore < beatSpread) {
                  bet.win = 1;
                  break;
                } else if (homeScore === beatSpread) {
                  bet.win = 2;
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
                  bet.win = 2
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
                bet.win = 2;
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
                bet.win = 2;
                break;
              } else {
                bet.win = -1;
                break;
              }
          }
        }
        // console.log(bet.win)
      }
      return bet.save();
    }).catch(err => {
      console.log(err)
    });
  })
}

module.exports = mongoose.model("bet", BetSchema);