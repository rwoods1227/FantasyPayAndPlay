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




DraftListSchema.statics.swapRankings = (draftListId, newRank) => {
  const Team = mongoose.model("team");
  const DraftList = mongoose.model("draftList");

  let promiseArr = [];
  DraftList.findById(draftListId).then(draftListPlayer => {
    Team.findById(draftListPlayer.team).then(team => {
      let oldRank = draftListPlayer.rank;
      // going to lower rank
      console.log(oldRank);
      console.log(newRank)
      if (oldRank > newRank) {
        team.preDraftPlayerRankings.forEach(playerId => {
          DraftList.findById(playerId).then(player => {
            if (player.rank < oldRank && player.rank >= newRank) {
              console.log(player.rank);
              console.log("found 1");
              player.rank = player.rank + 1;
              promiseArr.push(player.save());
            }
          });
        });

        draftListPlayer.rank = newRank;
        promiseArr.push(draftListPlayer.save());
        //going to higher rank
      }else{
        team.preDraftPlayerRankings.forEach(playerId => {
          DraftList.findById(playerId).then(player => {
            if (player.rank > oldRank && player.rank <= newRank) {
              console.log(player.rank);
              console.log("found 1");
              player.rank = player.rank - 1;
              promiseArr.push(player.save());
            }
          });
        });
        draftListPlayer.rank = newRank;
        promiseArr.push(draftListPlayer.save());
      }
      return Promise.all(promiseArr).then(resultArr => {
        console.log("swapped Positions");
        // let semiSortedPlayers = players.sort((a, b) =>
        //   !a.averageDraftPosition ||
        //   a.averageDraftPosition > b.averageDraftPosition
        //     ? 1
        //     : -1
        // );
        // let rankingsArr = []
        // team.preDraftPlayerRankings.forEach(playerId => {
        //   DraftList.findById(playerId).then(player => {
        //     rankingsArr.push(player);
        //   })
        // let sortedPlayers = rankingsArr.sort((a, b) => (a.rank > b.rank ? 1 : -1));
        
        //Sorting is complicated here because team wont populate the draftlist stuff, probably an error somewhere. Just sort on frontend easy 

        return team.save();
      });
    });
  });
};


module.exports = mongoose.model("draftList", DraftListSchema);