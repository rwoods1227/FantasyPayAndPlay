const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLList
} = graphql;
const mongoose = require("mongoose");

const axios = require('axios');
const NFLKey = require('../../config/keys').NFLKey;
const AuthService = require('../services/auth');
const UserType = require("./types/user_type");
const User = mongoose.model("user");
const BetType = require("./types/bet_type");
const Bet = mongoose.model("bet");
const UserBetType = require("./types/user_bet_type")


const authOptions = {
  method: "GET",
  url:
    "https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2019/10",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  },
};


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user our is an id
        id: { type: GraphQLID }
      },
      resolve(_, { id }) {
        return AuthService.logout({ _id: id });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    createAllBets: {
      type: new GraphQLList(BetType),
      resolve() {
          return axios(authOptions).then(res => {
            res.data.forEach(game => {
              let description = `${game.HomeTeamName} Vs. ${game.AwayTeamName}`;
              let date = game.DateTime;
              let win = false;


              let MoneylineAwayDetails = `Moneyline for ${game.AwayTeamName}` 
                let MoneylineAwayLine = game.PregameOdds[0].AwayMoneyLine;
              let MoneylineHomeDetails = `Moneyline for ${game.HomeTeamName}`
                let MoneylineHomeLine = game.PregameOdds[0].HomeMoneyLine;

              let OverUnderDetails = `Over/Under for ${description} is ${Math.round(game.PregameOdds[0].OverUnder)}`
                let OverLine = game.PregameOdds[0].OverPayout;
                let UnderLine = game.PregameOdds[0].UnderPayout;

              let SpreadDetails = `Spread for ${game.HomeTeamName} is ${Math.ceil(game.PregameOdds[0].HomePointSpread)}`
                let SpreadAwayLine = game.PregameOdds[0].AwayPointSpreadPayout;
                let SpreadHomeLine = game.PregameOdds[0].HomePointSpreadPayout;

               let MoneyLineAwayBet = new Bet({
                description: description,
                details: MoneylineAwayDetails,
                date: date,
                line: MoneylineAwayLine,
                win: win
              }).save();

              let MoneyLineHomeBet = new Bet({
                description: description,
                details: MoneylineHomeDetails,
                date: date,
                line: MoneylineHomeLine,
                win: win
              }).save();

              let OverBet = new Bet({
                description: description,
                details: OverUnderDetails,
                date: date,
                line: OverLine,
                win: win
              }).save();

                let UnderBet = new Bet({
                description: description,
                details: OverUnderDetails,
                date: date,
                line: UnderLine,
                win: win
              }).save();

                let SpreadAwayBet = new Bet({
                description: description,
                details: SpreadDetails,
                date: date,
                line: SpreadAwayLine,
                win: win
              }).save();

              let SpreadHomeBet = new Bet({
                description: description,
                details: SpreadDetails,
                date: date,
                line: SpreadHomeLine,
                win: win
              }).save();

              return { MoneyLineAwayBet, MoneyLineHomeBet, OverBet, UnderBet, SpreadAwayBet, SpreadHomeBet}
              
            });
          })
      
      }
    },
    deleteBet: {
      type: BetType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Bet.remove({ _id: id });
      }
    },
    deleteAllBets: {
      type: BetType,
      resolve() {
        return Bet.deleteMany({});
      }
    },
    deleteUserBet: {
      type: UserBetType,
      args: { _id: { type: GraphQLID } },
      resolve(parentValue, { _id }) {
        return UserBet.remove({ _id })
      }
    },
    createUserBet: {
      type: UserBetType,
      args: {
        betId: { type: GraphQLID },
        userId: { type: GraphQLID },
        value: { type: GraphQLFloat }
      },
      resolve(_, { betId, userId, value }) {
        return UserBet.makeUserBet(betId, userId, value);
      }
    }
  }
});

module.exports = mutation;
