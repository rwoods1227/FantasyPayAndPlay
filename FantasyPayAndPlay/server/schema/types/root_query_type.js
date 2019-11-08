const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
// const axios = require('axios');
// const AWSKey = require('../../../config/keys').AWSKey;

const User = mongoose.model("user");
const UserType = require("./user_type");


// const authOptions = {
//   method: "GET",
//   url:
//     "https://6eqbflk187.execute-api.us-east-2.amazonaws.com/default/generate-price",
//   headers: {
//     "x-api-key": AWSKey
//   },
// };



const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;