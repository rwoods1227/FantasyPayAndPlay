const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("bet", BetSchema);