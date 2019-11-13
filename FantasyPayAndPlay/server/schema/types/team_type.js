const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
const Team = mongoose.model("team");
const TeamType = new GraphQLObjectType({
  name: "TeamType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  // add user and follow through
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    players: {
      type: new GraphQLList(require('./player_type')),
      resolve(parentValue) {
        return Team.fetchTeamPlayers(parentValue.id)
      }
    }
  }),
});

module.exports = TeamType;