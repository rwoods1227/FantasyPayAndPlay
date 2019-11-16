const mongoose = require("mongoose");
const graphql = require("graphql");
const User = mongoose.model("user");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    balance: { type: GraphQLInt },
    userBet: {
      type: new GraphQLList(require('./user_bet_type')),
      resolve(parentValue) {
        return User.fetchUsersUserBets(parentValue.id)
      }
    },
    team: {
      type: new GraphQLList(require('./team_type')),
      resolve(parentValue) {
        return User.fetchUsersTeams(parentValue.id)
      }
    },
    leagues: {
      type: new GraphQLList(require('./league_type')),
      resolve(parentValue) {
        return User.fetchUsersLeagues(parentValue.id)
      }
    }
  })
});

module.exports = UserType;