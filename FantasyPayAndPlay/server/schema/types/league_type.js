const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
const League = mongoose.model("league");
const LeagueType = new GraphQLObjectType({
  name: "LeagueType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  // add user and follow through
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    draftDate: { type: GraphQLString },
    teams: {
      type: new GraphQLList(require('./team_type')),
      resolve(parentValue) {
        return League.fetchLeagueTeams(parentValue.id)
      }
    }
  }),
});

module.exports = LeagueType;