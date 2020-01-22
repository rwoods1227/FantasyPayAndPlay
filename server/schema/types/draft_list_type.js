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
  name: "DraftListType",
  fields: () => ({
    _id: { type: GraphQLID },
    playerId: { type: GraphQLID },
    team: {
      type: require('./team_type'),
        resolve(parentValue) {
          return Team.findById(parentValue.team)
        }
    },
    rank: { type: GraphQLInt }
  })
});

module.exports = DraftListType;
