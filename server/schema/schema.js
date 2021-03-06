const graphql = require("graphql");
const { GraphQLSchema } = graphql;
require("../models/index");

// import that lovely Root Query you just finished up and create your new schema!
const query = require("./types/root_query_type");
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query,
  mutation
});
