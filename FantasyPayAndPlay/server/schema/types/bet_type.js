const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
const Bet = mongoose.model("bet");
const BetType = new GraphQLObjectType({
  name: "BetType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    details: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    line: { type: GraphQLInt },
    scoreId: { type: GraphQLInt },
    win: { type: GraphQLInt },
    userBet: {
      type: new GraphQLList(require('./user_bet_type')),
      resolve(parentValue) {
        return Bet.fetchBetsUserBets(parentValue.id)
      }
    }
  }),
});

module.exports = BetType;