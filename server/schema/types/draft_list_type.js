const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = graphql;

let DraftListType = new GraphQLObjectType({
  name: "OwnedPlayerType",
  fields: () => ({
    _id: { type: GraphQLID },
    playerId: { type: GraphQLID },
    team: { type: GraphQLID },
    rank: {type: GraphQLInt}
  })
});

module.exports = DraftListType;
