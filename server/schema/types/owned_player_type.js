const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;
// 

let OwnedPlayerType = new GraphQLObjectType({
  name: 'OwnedPlayerType',
  fields: () => ({
    _id: { type: GraphQLID },
    playerId: { type: GraphQLID},
    leagueId: { type: GraphQLID },
    leagueOwned: { type: GraphQLBoolean }
  })
});

module.exports = OwnedPlayerType;