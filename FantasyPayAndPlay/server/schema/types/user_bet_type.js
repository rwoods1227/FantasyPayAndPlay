const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQL,
  GraphQLList,
  GraphQLFloat
} = graphql;

const UserBetType = new GraphQLObjectType({
  name: "UserBetType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    value: { type: GraphQLFloat },

    bet: { 
      type: require('./bet_type'),
        resolve(parentValue) {
          return Bet.findById(parentValue.bet)
        }
    },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return User.findById(parentValue.user)
      } 
    }
  })
});

module.exports = UserBetType;