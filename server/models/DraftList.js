const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// draft list of players with ranks tied to a team
const DraftListSchema = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: "player",
    required: false
  },
  rank: {
    type: Number,
    default: false
  },
  team:
    {
      type: Schema.Types.ObjectId,
      ref: "team"
    }
});

module.exports = mongoose.model("draftList", DraftListSchema);


DraftListSchema.statics.swapRankings = (draftListId, newRank) => {
  const Team = mongoose.model("team");
  const DraftList = mongoose.model("draftList");

  let promiseArr = [];
  DraftList.findById(draftListId).then(draftListPlayer => {
    Team.findById(draftListPlayer.team).then(team => {
      let oldRank = draftListPlayer.rank;
      // going to lower rank
      if (oldRank > newRank) {
        team.draftListPlayers.forEach(player => {
          if(player.rank < oldRank && player.rank >= newRank){
            player.rank = player.rank + 1;
            promiseArr.push(player.save());
          }
        })
        promiseArr.push(draftListPlayer.save());
        //going to higher rank
      }else{
        team.draftListPlayers.forEach(player => {
          if (player.rank > oldRank && player.rank <= newRank) {
            player.rank = player.rank - 1;
            promiseArr.push(player.save());
          }
        });
        promiseArr.push(draftListPlayer.save());
      }
      return Promise.all(promiseArr).then(resultArr => {
        console.log("swapped Positions");
        return team.save();
      });
    });
  });
};