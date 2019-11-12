const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
// const axios = require('axios');
// const NFLKey = require('../../../config/keys').NFLKey;

const User = mongoose.model("user");
const UserType = require("./user_type");
const Bet = mongoose.model("bet");
const BetType = require("./bet_type");
const UserBetType = require("./user_bet_type");
const UserBet = mongoose.model("userbet");


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
    }
  })
});

module.exports = RootQueryType;