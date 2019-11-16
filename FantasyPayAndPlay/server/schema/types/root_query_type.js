const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
// const axios = require('axios');
// const NFLKey = require('../../../config/keys').NFLKey;

const User = mongoose.model("user");
const UserType = require("./user_type");
const Bet = mongoose.model("bet");
const BetType = require("./bet_type");
const UserBetType = require("./user_bet_type");
const UserBet = mongoose.model("userbet");
const Player = mongoose.model("player");
const PlayerType = require("./player_type");
const Team = mongoose.model("team");
const TeamType = require("./team_type");
const League = mongoose.model("league");
const LeagueType = require("./league_type");


// const authOptions = {
//   method: "GET",
//   url:
//     "https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2019/10",
//   headers: {
//     "x-api-key": NFLKey
//   },
// };



const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    bets: {
      type: new GraphQLList(BetType),
      resolve() {
        return Bet.find({});
      }
    },
    bet: {
      type: BetType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Bet.findById(args._id);
      }
    },
    userBet: {
      type: UserBetType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) {
        return UserBet.findById(args._id)
      }
    },
    betTypes: {
      type: new GraphQLList(BetType),
      args: { description: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(_, { description }) {
        return Bet.find({ description });
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve() {
        return Player.find({});
      }
    },
    player: {
      type: PlayerType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Player.findById(args._id);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve() {
        return Team.find({});
      }
    },
    team: {
      type: TeamType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Team.findById(args._id);
      }
    },
    leagues: {
      type: new GraphQLList(LeagueType),
      resolve() {
        return League.find({});
      }
    },
    league: {
      type: LeagueType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return League.findById(args._id);
      }
    },
  })
});

module.exports = RootQueryType;