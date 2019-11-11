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

module.exports = mongoose.model("userbet", UserBetSchema);