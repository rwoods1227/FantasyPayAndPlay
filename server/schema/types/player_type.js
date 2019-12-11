const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLFloat } = graphql;

const Player = mongoose.model("player");
const UserType = require("./user_type");
const User = mongoose.model("user");

const PlayerType = new GraphQLObjectType({
  name: "PlayerType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    // not populated can do that if need be
    userTeam: { type: GraphQLID },
    name: { type: GraphQLString },
    team: { type: GraphQLString },
    position: { type: GraphQLString },
    IsGameOver: { type: GraphQLBoolean },
    
    projWPassingAttempts: { type: GraphQLFloat },
    projWPassingCompletions: { type: GraphQLFloat },
    projWPassingYards: { type: GraphQLFloat },
    projWPassingTouchdowns: { type: GraphQLFloat },
    projWPassingInterceptions: { type: GraphQLFloat },
    projWRushingAttempts: { type: GraphQLFloat },
    projWRushingYards: { type: GraphQLFloat },
    projWRushingTouchdowns: { type: GraphQLFloat },
    projWFumblesLost: { type: GraphQLFloat },
    projWReceivingTargets: { type: GraphQLFloat },
    projWReceptions: { type: GraphQLFloat },
    projWReceivingYards: { type: GraphQLFloat },
    projWReceivingTouchdowns: { type: GraphQLFloat },
    projWTwoPointConversionPasses: { type: GraphQLFloat },
    projWTwoPointConversionRuns: { type: GraphQLFloat },
    projWTwoPointConversionReceptions: { type: GraphQLFloat },
    projWFantasyPoints: { type: GraphQLFloat },
    projWFantasyPointsPPR: { type: GraphQLFloat },
    projWActive: { type: GraphQLBoolean },

    weeklyPassingAttempts: { type: GraphQLFloat },
    weeklyPassingCompletions: { type: GraphQLFloat },
    weeklyPassingYards: { type: GraphQLFloat },
    weeklyPassingTouchdowns: { type: GraphQLFloat },
    weeklyPassingInterceptions: { type: GraphQLFloat },
    weeklyRushingAttempts: { type: GraphQLFloat },
    weeklyRushingYards: { type: GraphQLFloat },
    weeklyRushingTouchdowns: { type: GraphQLFloat },
    weeklyFumblesLost: { type: GraphQLFloat },
    weeklyReceivingTargets: { type: GraphQLFloat },
    weeklyReceptions: { type: GraphQLFloat },
    weeklyReceivingYards: { type: GraphQLFloat },
    weeklyReceivingTouchdowns: { type: GraphQLFloat },
    weeklyTwoPointConversionPasses: { type: GraphQLFloat },
    weeklyTwoPointConversionRuns: { type: GraphQLFloat },
    weeklyTwoPointConversionReceptions: { type: GraphQLFloat },
    weeklyFantasyPoints: { type: GraphQLFloat },
    weeklyFantasyPointsPPR: { type: GraphQLFloat },
    weeklyActive: { type: GraphQLBoolean },

    seasonPassingAttempts: { type: GraphQLFloat },
    seasonPassingCompletions: { type: GraphQLFloat },
    seasonPassingYards: { type: GraphQLFloat },
    seasonPassingTouchdowns: { type: GraphQLFloat },
    seasonPassingInterceptions: { type: GraphQLFloat },
    seasonRushingAttempts: { type: GraphQLFloat },
    seasonRushingYards: { type: GraphQLFloat },
    seasonRushingTouchdowns: { type: GraphQLFloat },
    seasonFumblesLost: { type: GraphQLFloat },
    seasonReceivingTargets: { type: GraphQLFloat },
    seasonReceptions: { type: GraphQLFloat },
    seasonReceivingYards: { type: GraphQLFloat },
    seasonReceivingTouchdowns: { type: GraphQLFloat },
    seasonTwoPointConversionPasses: { type: GraphQLFloat },
    seasonTwoPointConversionRuns: { type: GraphQLFloat },
    seasonTwoPointConversionReceptions: { type: GraphQLFloat },
    seasonFantasyPoints: { type: GraphQLFloat },
    seasonFantasyPointsPPR: { type: GraphQLFloat },

    projSPassingAttempts: { type: GraphQLFloat },
    projSPassingCompletions: { type: GraphQLFloat },
    projSPassingYards: { type: GraphQLFloat },
    projSPassingTouchdowns: { type: GraphQLFloat },
    projSPassingInterceptions: { type: GraphQLFloat },
    projSRushingAttempts: { type: GraphQLFloat },
    projSRushingYards: { type: GraphQLFloat },
    projSRushingTouchdowns: { type: GraphQLFloat },
    projSFumblesLost: { type: GraphQLFloat },
    projSReceivingTargets: { type: GraphQLFloat },
    projSReceptions: { type: GraphQLFloat },
    projSReceivingYards: { type: GraphQLFloat },
    projSReceivingTouchdowns: { type: GraphQLFloat },
    projSTwoPointConversionPasses: { type: GraphQLFloat },
    projSTwoPointConversionRuns: { type: GraphQLFloat },
    projSTwoPointConversionReceptions: { type: GraphQLFloat },
    projSFantasyPoints: { type: GraphQLFloat },
    projSFantasyPointsPPR: { type: GraphQLFloat },

    averageDraftPosition: { type: GraphQLFloat },
    averageDraftPositionPPR: { type: GraphQLFloat }
//this user relation will be changed abit I think
    // user: {
    //   type: UserType,
    //   resolve(parentValue) {
    //     return User.findById(parentValue.user).then((user) => user);
    //   }
    // },
  }),
});

module.exports = PlayerType;