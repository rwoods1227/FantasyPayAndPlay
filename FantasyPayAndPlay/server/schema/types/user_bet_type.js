const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQL,
  GraphQLInt
} = graphql;

const UserBetType = new GraphQLObjectType({
  name: "UserBetType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    value: { type: GraphQLInt },

    bet: { 
      type: require('./bet_type'),
        resolve(parentValue) {
          return UserBet.findById(parentValue._id)
            .populate("bet")
            .then(UserBet => {
              return UserBet.bet
          })
        }
    },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return UserBet.findById(parentValue._id)
          .populate("user")
          .then(UserBet => {
            return UserBet.user
          })
      } 
    }
  })
});

module.exports = UserBetType;