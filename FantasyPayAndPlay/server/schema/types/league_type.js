const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
const League = mongoose.model("league");


let ownedPlayerType = new GraphQLObjectType({
  name: 'ownedPlayerType',
  fields: {
    name: { type: GraphQLString },
    leagueOwned: { type: GraphQLBoolean }
  }
});


const LeagueType = new GraphQLObjectType({
  name: "LeagueType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  // add user and follow through
  fields: () => ({
    _id: { type: GraphQLID },
    comissioner: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    draftDate: { type: GraphQLString },
    teams: {
      type: new GraphQLList(require('./team_type')),
      resolve(parentValue) {
        return League.fetchLeagueTeams(parentValue.id)
      }
    },
    users: {
      type: new GraphQLList(require('./user_type')),
      resolve(parentValue) {
        return League.fetchLeagueUsers(parentValue.id)
      }
    },
    ownedPlayers: {
      type: new GraphQLList(ownedPlayerType),
      resolve(parentValue) {
        return League.fetchLeagueOwnedPlayers(parentValue.id)
      }
    }
  }),
});

module.exports = LeagueType;