const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  userTeams: 
  [
    {
      type: Schema.Types.ObjectId,
      ref: "team"
    }
  ],
  name: {
    type: String,
    required: false,
  },
  team: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  IsGameOver: {
    type: Boolean,
    default: false
  },
  projWPassingAttempts: {
    type: Number,
    required: false,
  },
  projWPassingCompletions: {
    type: Number,
    required: false,
  },
  projWPassingYards: {
    type: Number,
    required: false,
  },
  projWPassingTouchdowns: {
    type: Number,
    required: false,
  },
  projWPassingInterceptions: {
    type: Number,
    required: false,
  },
  projWRushingAttempts: {
    type: Number,
    required: false,
  },
  projWRushingYards: {
    type: Number,
    required: false,
  },
  projWRushingTouchdowns: {
    type: Number,
    required: false,
  },
  projWFumblesLost: {
    type: Number,
    required: false,
  },
  projWReceivingTargets: {
    type: Number,
    required: false,
  },
  projWReceptions: {
    type: Number,
    required: false,
  },
  projWReceivingYards: {
    type: Number,
    required: false,
  },
  projWReceivingTouchdowns: {
    type: Number,
    required: false,
  },
  projWTwoPointConversionPasses: {
    type: Number,
    required: false,
  },
  projWTwoPointConversionRuns: {
    type: Number,
    required: false,
  },
  projWTwoPointConversionReceptions: {
    type: Number,
    required: false,
  },
  projWFantasyPoints: {
    type: Number,
    required: false,
  },
  projWFantasyPointsPPR: {
    type: Number,
    required: false,
  },
  projWActive: {
    type: Boolean,
    required: false,
  },
  weeklyPassingAttempts: {
    type: Number,
    required: false,
  },
  weeklyPassingCompletions: {
    type: Number,
    required: false,
  },
  weeklyPassingYards: {
    type: Number,
    required: false,
  },
  weeklyPassingTouchdowns: {
    type: Number,
    required: false,
  },
  weeklyPassingInterceptions: {
    type: Number,
    required: false,
  },
  weeklyRushingAttempts: {
    type: Number,
    required: false,
  },
  weeklyRushingYards: {
    type: Number,
    required: false,
  },
  weeklyRushingTouchdowns: {
    type: Number,
    required: false,
  },
  weeklyFumblesLost: {
    type: Number,
    required: false,
  },
  weeklyReceivingTargets: {
    type: Number,
    required: false,
  },
  weeklyReceptions: {
    type: Number,
    required: false,
  },
  weeklyReceivingYards: {
    type: Number,
    required: false,
  },
  weeklyReceivingTouchdowns: {
    type: Number,
    required: false,
  },
  weeklyTwoPointConversionPasses: {
    type: Number,
    required: false,
  },
  weeklyTwoPointConversionRuns: {
    type: Number,
    required: false,
  },
  weeklyTwoPointConversionReceptions: {
    type: Number,
    required: false,
  },
  weeklyFantasyPoints: {
    type: Number,
    required: false,
  },
  weeklyFantasyPointsPPR: {
    type: Number,
    required: false,
  },
  weeklyActive: {
    type: Boolean,
    required: false,
  },
  seasonPassingAttempts: {
    type: Number,
    required: false,
  },
  seasonPassingCompletions: {
    type: Number,
    required: false,
  },
  seasonPassingYards: {
    type: Number,
    required: false,
  },
  seasonPassingTouchdowns: {
    type: Number,
    required: false,
  },
  seasonPassingInterceptions: {
    type: Number,
    required: false,
  },
  seasonRushingAttempts: {
    type: Number,
    required: false,
  },
  seasonRushingYards: {
    type: Number,
    required: false,
  },
  seasonRushingTouchdowns: {
    type: Number,
    required: false,
  },
  seasonFumblesLost: {
    type: Number,
    required: false,
  },
  seasonReceivingTargets: {
    type: Number,
    required: false,
  },
  seasonReceptions: {
    type: Number,
    required: false,
  },
  seasonReceivingYards: {
    type: Number,
    required: false,
  },
  seasonReceivingTouchdowns: {
    type: Number,
    required: false,
  },
  seasonTwoPointConversionPasses: {
    type: Number,
    required: false,
  },
  seasonTwoPointConversionRuns: {
    type: Number,
    required: false,
  },
  seasonTwoPointConversionReceptions: {
    type: Number,
    required: false,
  },
  seasonFantasyPoints: {
    type: Number,
    required: false,
  },
  seasonFantasyPointsPPR: {
    type: Number,
    required: false,
  },
  projSPassingAttempts: {
    type: Number,
    required: false,
  },
  projSPassingCompletions: {
    type: Number,
    required: false,
  },
  projSPassingYards: {
    type: Number,
    required: false,
  },
  projSPassingTouchdowns: {
    type: Number,
    required: false,
  },
  projSPassingInterceptions: {
    type: Number,
    required: false,
  },
  projSRushingAttempts: {
    type: Number,
    required: false,
  },
  projSRushingYards: {
    type: Number,
    required: false,
  },
  projSRushingTouchdowns: {
    type: Number,
    required: false,
  },
  projSFumblesLost: {
    type: Number,
    required: false,
  },
  projSReceivingTargets: {
    type: Number,
    required: false,
  },
  projSReceptions: {
    type: Number,
    required: false,
  },
  projSReceivingYards: {
    type: Number,
    required: false,
  },
  projSReceivingTouchdowns: {
    type: Number,
    required: false,
  },
  projSTwoPointConversionPasses: {
    type: Number,
    required: false,
  },
  projSTwoPointConversionRuns: {
    type: Number,
    required: false,
  },
  projSTwoPointConversionReceptions: {
    type: Number,
    required: false,
  },
  projSFantasyPoints: {
    type: Number,
    required: false,
  },
  projSFantasyPointsPPR: {
    type: Number,
    required: false,
  },
  averageDraftPositionPPR: {
    type: Number,
    required: false,
  },
  averageDraftPosition: {
    type: Number,
    required: false,
  }
});

//product === player
//category === team

PlayerSchema.statics.addPlayerToTeam = (playerId, teamId) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const OwnedPlayer = mongoose.model("ownedPlayer");
  let promiseArr = [];

  return Player.findById(playerId).then(player => {
    return Team.findById(teamId).then(newTeam => {
      return League.findById(newTeam.league._id).then(newLeague => {
       // console.log(newLeague.ownedPlayers[0].playerId)
        //console.log(playerId);
         newLeague.ownedPlayers.forEach(ownedPlayerId => {
          OwnedPlayer.findById(ownedPlayerId).then(ownedPlayer => {
           // console.log(`${ownedPlayer.playerId}` === `${playerId}`);
            // console.log(playerId);
             if(`${ownedPlayer.playerId}` === `${playerId}`){
               //console.log("found one")
               ownedPlayer.leagueOwned = true;
               promiseArr.push(ownedPlayer.save())
             }


          })
        });
        
        player.userTeams.push(newTeam);
        newTeam.players.push(player);
        promiseArr.push(player.save());
        promiseArr.push(newTeam.save());
        promiseArr.push(newLeague.save());
        return Promise.all(promiseArr).then(
          ([player, newTeam, ownedPlayer]) => player
        );
      });
    });
  });
};

PlayerSchema.statics.removePlayerFromTeam = (playerId, teamId) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const OwnedPlayer = mongoose.model("ownedPlayer");
  let promiseArr = [];

  return Player.findById(playerId).then(player => {
    return Team.findById(teamId).then(newTeam => {
      return League.findById(newTeam.league._id).then(newLeague => {
        // console.log(newLeague.ownedPlayers[0].playerId)
        //console.log(playerId);
        newLeague.ownedPlayers.forEach(ownedPlayerId => {
          OwnedPlayer.findById(ownedPlayerId).then(ownedPlayer => {
            // console.log(`${ownedPlayer.playerId}` === `${playerId}`);
            // console.log(playerId);
            if (`${ownedPlayer.playerId}` === `${playerId}`) {
              console.log("found one")
              ownedPlayer.leagueOwned = false;
              promiseArr.push(ownedPlayer.save())
            }


          })
        });

        player.userTeams.pull(newTeam);
        newTeam.players.pull(player);
        promiseArr.push(player.save());
        promiseArr.push(newTeam.save());
        promiseArr.push(newLeague.save());
        return Promise.all(promiseArr).then(
          ([player, newTeam, ownedPlayer]) => player
        );
      });
    });
  });
};

PlayerSchema.statics.tradePlayerForPlayer = (playerId1, teamId1, playerId2, teamId2) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const OwnedPlayer = mongoose.model("ownedPlayer");
  let promiseArr = [];

  return Player.findById(playerId1).then(player1 => {
    return Team.findById(teamId1).then(newTeam1 => {
      return Player.findById(playerId2).then(player2 => {
        return Team.findById(teamId2).then(newTeam2 => {
          return League.findById(newTeam1.league._id).then(newLeague => {
           
            // for now testing one to one trade so players will remain owned in league no matter what/
            // also other catches are not accounted for as there is likely no way for them to be triggered on frontend

            // newLeague.ownedPlayers.forEach(ownedPlayerId => {
            //   OwnedPlayer.findById(ownedPlayerId).then(ownedPlayer => {
            //     // console.log(`${ownedPlayer.playerId}` === `${playerId}`);
            //     // console.log(playerId);
            //     if (`${ownedPlayer.playerId}` === `${playerId}`) {
            //       console.log("trade success");
            //       ownedPlayer.leagueOwned = false;
            //       promiseArr.push(ownedPlayer.save());
            //     }
            //   });
            // });

            player1.userTeams.pull(newTeam1);
            newTeam1.players.pull(player1);
            player2.userTeams.pull(newTeam2);
            newTeam2.players.pull(player2);

            player1.userTeams.push(newTeam2);
            newTeam1.players.push(player2);
            player2.userTeams.push(newTeam1);
            newTeam2.players.push(player1);


            promiseArr.push(player1.save());
            promiseArr.push(newTeam1.save());
            promiseArr.push(player2.save());
            promiseArr.push(newTeam2.save());

            promiseArr.push(newLeague.save());
            return Promise.all(promiseArr).then(
              ([player1, newTeam1, player2, newTeam2, ownedPlayer]) => [newTeam1, newTeam2]
            );
          });
        });
      });
    });
  });
};




PlayerSchema.statics.filteredPlayers = (leagueId) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  const League = mongoose.model("league");
  const OwnedPlayer = mongoose.model("ownedPlayer");
  //let promiseArr = [];
  let unownedPlayerArr = [];
  let availablePlayers = [];


  return League.findById(leagueId).then(newLeague => {
    newLeague.ownedPlayers.forEach(ownedPlayerId => {
      OwnedPlayer.findById(ownedPlayerId).then(ownedPlayer => {
        if (!ownedPlayer.leagueOwned) {
          unownedPlayerArr.push(ownedPlayer.playerId);
        }
      })
    });

    return Player.find({}).then(players => {
      //console.log(unownedPlayerArr)
      players.forEach(player => {
        // console.log(player._id)
        // console.log(unownedPlayerArr[0])
        // console.log(unownedPlayerArr.includes(player._id))
        unownedPlayerArr.forEach(unownedPlayerId => {
          if (`${unownedPlayerId}` === `${player._id}`){
            //console.log("1")
            availablePlayers.push(player)
          }
        });
        
      });
      return availablePlayers;
    });
  });
};


module.exports = mongoose.model("player", PlayerSchema);


