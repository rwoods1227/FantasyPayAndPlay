const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  userTeam: 
    {
      type: Schema.Types.ObjectId,
      ref: "team"
    },
  owned: {
    type: Boolean,
    default: false
  },
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

  return Player.findById(playerId).then(player => {
    return Team.findById(teamId).then(newTeam => {
      player.userTeam = newTeam;
      player.owned = true;
      newTeam.players.push(player);

      return Promise.all([player.save(), newTeam.save()]).then(
        ([player, newTeam]) => player
      );
    });
  });
};

PlayerSchema.statics.removePlayerFromTeam = (playerId, teamId) => {
  const Player = mongoose.model("player");
  const Team = mongoose.model("team");
  //not using teamId but leaving it in there in case needed later
  return Player.findById(playerId).then(player => {
    // if the player already had a category
    if (player.userTeam) {
      // find the old team and remove this player from it's players
      Team.findById(player.userTeam).then(oldUserTeam => {
        oldUserTeam.players.pull(player);
        return oldUserTeam.save();
      });
    }
    //return player to available players field
    player.userTeam = null;
    player.owned = false;
    return Promise.all([player.save()]).then(
      ([player]) => player
    );
  });
};




module.exports = mongoose.model("player", PlayerSchema);


//weekly projections will have prefix of projW
//season projections will have prefix of projS
//weekly stats will have prefix of weekly
//season stats will have prefix of season

//fantasy projected weekly stats https:/ / api.sportsdata.io / v3 / nfl / projections / json / PlayerGameProjectionStatsByWeek / 2019 / 10

  //FantasyPointsYahoo
  //Name
  //Position
  //Played(0/1)
  //Started(0/1)
  //Activated(0/1)


  //To begin with stats will not be included but here are the keys
  //PassingAttempts
  //PassingCompletions
  //PassingYards
  //PassingTouchdowns
  //PassingInterceptions
  //RushingAttempts
  //RushingYards
  //RushingTouchdowns
  //FumblesLost
  //ReceivingTargets
  //Receptions
  //ReceivingYards
  //ReceivingTouchdowns
  //TwoPointConversionPasses
  //TwoPointConversionRuns
  //TwoPointConversionReceptions

  //FantasyPoints
  //FantasyPointsPPR

  //IsGameOver(true/false)

//Keys from API call for weekly stats https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/2019/10
  //FantasyPointsYahoo
  //Name
  //Position
  //Played(0/1)
  //Started(0/1)
  //Activated(0/1)


  //To begin with stats will not be included but here are the keys
  //PassingAttempts
  //PassingCompletions
  //PassingYards
  //PassingTouchdowns
  //PassingInterceptions
  //RushingAttempts
  //RushingYards
  //RushingTouchdowns
  //FumblesLost
  //ReceivingTargets
  //Receptions
  //ReceivingYards
  //ReceivingTouchdowns
  //TwoPointConversionPasses
  //TwoPointConversionRuns
  //TwoPointConversionReceptions

  //FantasyPoints
  //FantasyPointsPPR

  //IsGameOver(true/false)

//Keys from season stats https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/2019 (same free key)
  //FantasyPointsYahoo
  //Name
  //Position


  //PassingAttempts
  //PassingCompletions
  //PassingYards
  //PassingTouchdowns
  //PassingInterceptions
  //RushingAttempts
  //RushingYards
  //RushingTouchdowns
  //FumblesLost
  //ReceivingTargets
  //Receptions
  //ReceivingYards
  //ReceivingTouchdowns
  //TwoPointConversionPasses
  //TwoPointConversionRuns
  //TwoPointConversionReceptions

  //FantasyPoints
  //FantasyPointsPPR



// projected season stats (for draft stuff)   https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStats/2019

  //FantasyPointsYahoo
  //Name
  //Position
  //Played(0/1)
  //Started(0/1)
  //Activated(0/1)


  //To begin with stats will not be included but here are the keys
  //PassingAttempts
  //PassingCompletions
  //PassingYards
  //PassingTouchdowns
  //PassingInterceptions
  //RushingAttempts
  //RushingYards
  //RushingTouchdowns
  //FumblesLost
  //ReceivingTargets
  //Receptions
  //ReceivingYards
  //ReceivingTouchdowns
  //TwoPointConversionPasses
  //TwoPointConversionRuns
  //TwoPointConversionReceptions

  //FantasyPoints
  //FantasyPointsPPR
  //AverageDraftPositionPPR
  //AverageDraftPosition