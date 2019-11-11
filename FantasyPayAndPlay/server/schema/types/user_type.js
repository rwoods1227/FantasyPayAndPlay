const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
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
    balance: { type: GraphQLFloat },
    userBet: {
      type: new GraphQLList(require('./user_bet_type')),
      resolve(parentValue) {
        return User.fetchUsersUserBets(parentValue.id)
      }
    }
  })
});

module.exports = UserType;