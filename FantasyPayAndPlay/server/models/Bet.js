const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BetSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
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
  line: {
    type: Number,
    required: false,
  },
  win: {
    type: Boolean,
    default: false
 }
});

BetSchema.statics.fetchBetUsers = BetId => {
  const Bet = mongoose.model("bet");
  return Bet.findById(BetId)
    .populate("users")
    .then(bet => bet.users);

};

module.exports = mongoose.model("bet", BetSchema);