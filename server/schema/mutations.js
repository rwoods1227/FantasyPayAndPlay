const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const mongoose = require("mongoose");
const sortJsonArray = require('sort-json-array');

const axios = require('axios');
const NFLKey = require('../../config/keys').NFLKey;
const AuthService = require('../services/auth');
const UserType = require("./types/user_type");
const User = mongoose.model("user");
const BetType = require("./types/bet_type");
const Bet = mongoose.model("bet");
const UserBetType = require("./types/user_bet_type")
const UserBet = mongoose.model("userbet")
const PlayerType = require("./types/player_type");
const Player = mongoose.model("player");
const TeamType = require("./types/team_type");
const Team = mongoose.model("team");
const LeagueType = require("./types/league_type");
const League = mongoose.model("league");
const OwnedPlayer = mongoose.model("ownedPlayer");
const OwnedPlayerType = require("./types/owned_player_type");



const authOptions = {
  method: "GET",
  url:
    "https://api.sportsdata.io/v3/nfl/odds/json/GameOddsByWeek/2019/15",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  },
};

const weeklyStats = {
  method: "GET",
  url:
    "https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/2019/14",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  },
};

const projWeeklyStats = {
  method: "GET",
  url:
    "https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByWeek/2019/15",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  },
};

const seasonStats = {
  method: "GET",
  url:
    "https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/2019",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  },
};


const projSeasonStats = {
  method: "GET",
  url:
  "https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStats/2019",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  },
};

const weeklyGameScores = {
  method: "GET",
  url: "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2019/14",
  headers: {
    "Ocp-Apim-Subscription-Key": NFLKey
  }
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
            let win = 0;
            let scoreId = game.ScoreId;

            let MoneylineAwayDetails = `Moneyline for ${game.AwayTeamName}`;
            let MoneylineAwayLine = game.PregameOdds[0].AwayMoneyLine;
            let MoneylineHomeDetails = `Moneyline for ${game.HomeTeamName}`;
            let MoneylineHomeLine = game.PregameOdds[0].HomeMoneyLine;

            let OverUnderDetails = `Over/Under for ${description} is ${Math.round(
              game.PregameOdds[0].OverUnder
            )}`;
            let OverLine = game.PregameOdds[0].OverPayout;
            let UnderLine = game.PregameOdds[0].UnderPayout;

            let SpreadDetails = `Spread for ${game.HomeTeamName} is ${Math.ceil(
              game.PregameOdds[0].HomePointSpread + 0.5
            )}`;
            let SpreadAwayLine = game.PregameOdds[0].AwayPointSpreadPayout;
            let SpreadHomeLine = game.PregameOdds[0].HomePointSpreadPayout;

            let MoneyLineAwayBet = new Bet({
              description: description,
              details: MoneylineAwayDetails,
              wagerType: "Moneyline Away",
              date: date,
              line: MoneylineAwayLine,
              scoreId: scoreId,
              win: win
            }).save();

            let MoneyLineHomeBet = new Bet({
              description: description,
              details: MoneylineHomeDetails,
              wagerType: "Moneyline Home",
              date: date,
              line: MoneylineHomeLine,
              scoreId: scoreId,
              win: win
            }).save();

            let OverBet = new Bet({
              description: description,
              details: OverUnderDetails,
              wagerType: "Over/under Over",
              date: date,
              line: OverLine,
              scoreId: scoreId,
              win: win
            }).save();

            let UnderBet = new Bet({
              description: description,
              details: OverUnderDetails,
              wagerType: "Over/under Under",
              date: date,
              line: UnderLine,
              scoreId: scoreId,
              win: win
            }).save();

            let SpreadAwayBet = new Bet({
              description: description,
              details: SpreadDetails,
              wagerType: "Spread Away",
              date: date,
              line: SpreadAwayLine,
              scoreId: scoreId,
              win: win
            }).save();

            let SpreadHomeBet = new Bet({
              description: description,
              details: SpreadDetails,
              wagerType: "Spread Home",
              date: date,
              line: SpreadHomeLine,
              scoreId: scoreId,
              win: win
            }).save();

            return {
              MoneyLineAwayBet,
              MoneyLineHomeBet,
              OverBet,
              UnderBet,
              SpreadAwayBet,
              SpreadHomeBet
            };
          });
        });
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
        return UserBet.remove({ _id });
      }
    },
    createUserBet: {
      type: UserBetType,
      args: {
        betId: { type: GraphQLID },
        userId: { type: GraphQLID },
        value: { type: GraphQLInt }
      },
      resolve(_, { betId, userId, value }) {
        return UserBet.makeUserBet(betId, userId, value);
      }
    },
    updateUserBalance: {
      type: UserBetType,
      args: {
        bet: { type: GraphQLID },
        user: { type: GraphQLID }
      },
      resolve(_, { bet, user }) {
        return UserBet.updateTheUserBalance(bet, user);
      }
    },
    determineWinValue: {
      type: BetType,
      args: {
        _id: { type: GraphQLID }
        // win: { type: GraphQLInt }
      },
      resolve(_, { _id }) {
        return Bet.changeWinValue(_id);
      }
    },
    createAllPlayers: {
      type: new GraphQLList(PlayerType),
      resolve() {
        const promiseArr = [];
        const allPlayers = {};

        promiseArr.push(
          axios(seasonStats).then(res => {
            let seasonStatsArr = res.data;
            sortJsonArray(seasonStatsArr, "PlayerID");
            // console.log(seasonStatsArr[0].PlayerID);
            seasonStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                // allPlayers[`${player.PlayerID}`] = {};
                console.log("4");
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }

                allPlayers[`${player.PlayerID}`][
                  "seasonPassingAttempts"
                ] = Math.round(player.PassingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingCompletions"
                ] = Math.round(player.PassingCompletions);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingYards"
                ] = Math.round(player.PassingYards);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingTouchdowns"
                ] = Math.round(player.PassingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingInterceptions"
                ] = Math.round(player.PassingInterceptions);
                allPlayers[`${player.PlayerID}`][
                  "seasonRushingAttempts"
                ] = Math.round(player.RushingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "seasonRushingYards"
                ] = Math.round(player.RushingYards);
                allPlayers[`${player.PlayerID}`][
                  "seasonRushingTouchdowns"
                ] = Math.round(player.RushingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "seasonFumblesLost"
                ] = Math.round(player.FumblesLost);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceivingTargets"
                ] = Math.round(player.ReceivingTargets);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceptions"
                ] = Math.round(player.Receptions);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceivingYards"
                ] = Math.round(player.ReceivingYards);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceivingTouchdowns"
                ] = Math.round(player.ReceivingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "seasonTwoPointConversionPasses"
                ] = Math.round(player.TwoPointConversionPasses);
                allPlayers[`${player.PlayerID}`][
                  "seasonTwoPointConversionRuns"
                ] = Math.round(player.TwoPointConversionRuns);
                allPlayers[`${player.PlayerID}`][
                  "seasonTwoPointConversionReceptions"
                ] = Math.round(player.TwoPointConversionReceptions);
                allPlayers[`${player.PlayerID}`]["seasonFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["seasonFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
              }
            });
          })
        );

        promiseArr.push(
          axios(weeklyStats).then(res => {
            let weeklyStatsArr = res.data;
            sortJsonArray(weeklyStatsArr, "PlayerID");
            // console.log(weeklyStatsArr[0].PlayerID);
            weeklyStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                // allPlayers[`${player.PlayerID}`] = {};
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }

                console.log("3");
                allPlayers[`${player.PlayerID}`]["isGameOver"] =
                  player.IsGameOver;
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingAttempts"
                ] = Math.round(player.PassingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingCompletions"
                ] = Math.round(player.PassingCompletions);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingYards"
                ] = Math.round(player.PassingYards);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingTouchdowns"
                ] = Math.round(player.PassingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingInterceptions"
                ] = Math.round(player.PassingInterceptions);
                allPlayers[`${player.PlayerID}`][
                  "weeklyRushingAttempts"
                ] = Math.round(player.RushingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "weeklyRushingYards"
                ] = Math.round(player.RushingYards);
                allPlayers[`${player.PlayerID}`][
                  "weeklyRushingTouchdowns"
                ] = Math.round(player.RushingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyFumblesLost"
                ] = Math.round(player.FumblesLost);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceivingTargets"
                ] = Math.round(player.ReceivingTargets);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceptions"
                ] = Math.round(player.Receptions);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceivingYards"
                ] = Math.round(player.ReceivingYards);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceivingTouchdowns"
                ] = Math.round(player.ReceivingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyTwoPointConversionPasses"
                ] = Math.round(player.TwoPointConversionPasses);
                allPlayers[`${player.PlayerID}`][
                  "weeklyTwoPointConversionRuns"
                ] = Math.round(player.TwoPointConversionRuns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyTwoPointConversionReceptions"
                ] = Math.round(player.TwoPointConversionReceptions);
                allPlayers[`${player.PlayerID}`]["weeklyFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["weeklyFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
                allPlayers[`${player.PlayerID}`]["weeklyActive"] =
                  player.Active;
              }
            });
          })
        );

        promiseArr.push(
          axios(projWeeklyStats).then(res => {
            let projWeeklyStatsArr = res.data;
            sortJsonArray(projWeeklyStatsArr, "PlayerID");
            // console.log(projWeeklyStatsArr[0].PlayerID);
            projWeeklyStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }
                console.log("2");
                allPlayers[`${player.PlayerID}`]["projWPassingAttempts"] =
                  player.PassingAttempts;
                allPlayers[`${player.PlayerID}`]["projWPassingCompletions"] =
                  player.PassingCompletions;
                allPlayers[`${player.PlayerID}`]["projWPassingYards"] =
                  player.PassingYards;
                allPlayers[`${player.PlayerID}`]["projWPassingTouchdowns"] =
                  player.PassingTouchdowns;
                allPlayers[`${player.PlayerID}`]["projWPassingInterceptions"] =
                  player.PassingInterceptions;
                allPlayers[`${player.PlayerID}`]["projWRushingAttempts"] =
                  player.RushingAttempts;
                allPlayers[`${player.PlayerID}`]["projWRushingYards"] =
                  player.RushingYards;
                allPlayers[`${player.PlayerID}`]["projWRushingTouchdowns"] =
                  player.RushingTouchdowns;
                allPlayers[`${player.PlayerID}`]["projWFumblesLost"] =
                  player.FumblesLost;
                allPlayers[`${player.PlayerID}`]["projWReceivingTargets"] =
                  player.ReceivingTargets;
                allPlayers[`${player.PlayerID}`]["projWReceptions"] =
                  player.Receptions;
                allPlayers[`${player.PlayerID}`]["projWReceivingYards"] =
                  player.ReceivingYards;
                allPlayers[`${player.PlayerID}`]["projWReceivingTouchdowns"] =
                  player.ReceivingTouchdowns;
                allPlayers[`${player.PlayerID}`][
                  "projWTwoPointConversionPasses"
                ] = player.TwoPointConversionPasses;
                allPlayers[`${player.PlayerID}`][
                  "projWTwoPointConversionRuns"
                ] = player.TwoPointConversionRuns;
                allPlayers[`${player.PlayerID}`][
                  "projWTwoPointConversionReceptions"
                ] = player.TwoPointConversionReceptions;
                allPlayers[`${player.PlayerID}`]["projWFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["projWFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
                allPlayers[`${player.PlayerID}`]["projWActive"] = player.Active;
              }
            });
          })
        );

        promiseArr.push(
          axios(projSeasonStats).then(res => {
            let projSeasonStatsArr = res.data;
            sortJsonArray(projSeasonStatsArr, "PlayerID");

            projSeasonStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                console.log("1");
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }
                // allPlayers[`${player.PlayerID}`] = allPlayers[`${player.PlayerID}`] || {};

                allPlayers[`${player.PlayerID}`]["projSPassingAttempts"] =
                  player.PassingAttempts;
                allPlayers[`${player.PlayerID}`]["projSPassingCompletions"] =
                  player.PassingCompletions;
                allPlayers[`${player.PlayerID}`]["projSPassingYards"] =
                  player.PassingYards;
                allPlayers[`${player.PlayerID}`]["projSPassingTouchdowns"] =
                  player.PassingTouchdowns;
                allPlayers[`${player.PlayerID}`]["projSPassingInterceptions"] =
                  player.PassingInterceptions;
                allPlayers[`${player.PlayerID}`]["projSRushingAttempts"] =
                  player.RushingAttempts;
                allPlayers[`${player.PlayerID}`]["projSRushingYards"] =
                  player.RushingYards;
                allPlayers[`${player.PlayerID}`]["projSRushingTouchdowns"] =
                  player.RushingTouchdowns;
                allPlayers[`${player.PlayerID}`]["projSFumblesLost"] =
                  player.FumblesLost;
                allPlayers[`${player.PlayerID}`]["projSReceivingTargets"] =
                  player.ReceivingTargets;
                allPlayers[`${player.PlayerID}`]["projSReceptions"] =
                  player.Receptions;
                allPlayers[`${player.PlayerID}`]["projSReceivingYards"] =
                  player.ReceivingYards;
                allPlayers[`${player.PlayerID}`]["projSReceivingTouchdowns"] =
                  player.ReceivingTouchdowns;
                allPlayers[`${player.PlayerID}`][
                  "projSTwoPointConversionPasses"
                ] = player.TwoPointConversionPasses;
                allPlayers[`${player.PlayerID}`][
                  "projSTwoPointConversionRuns"
                ] = player.TwoPointConversionRuns;
                allPlayers[`${player.PlayerID}`][
                  "projSTwoPointConversionReceptions"
                ] = player.TwoPointConversionReceptions;
                allPlayers[`${player.PlayerID}`]["projSFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["projSFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
                allPlayers[`${player.PlayerID}`]["averageDraftPosition"] =
                  player.AverageDraftPosition;
                allPlayers[`${player.PlayerID}`]["averageDraftPositionPPR"] =
                  player.AverageDraftPositionPPR;
              }
            });
          })
        );

        console.log("finish 1", promiseArr);

        return Promise.all(promiseArr).then(() => {
          let promiseArr = [];
          // console.log("begin 2", allPlayers)
          Object.values(allPlayers).forEach(player => {
            // console.log("endpoint-player", player);
            promiseArr.push(
              new Player({
                name: player.name,
                team: player.team,
                position: player.position,
                IsGameOver: player.isGameOver,

                weeklyPassingAttempts: player.weeklyPassingAttempts,
                weeklyPassingCompletions: player.weeklyPassingCompletions,
                weeklyPassingYards: player.weeklyPassingYards,
                weeklyPassingTouchdowns: player.weeklyPassingTouchdowns,
                weeklyPassingInterceptions: player.weeklyPassingInterceptions,
                weeklyRushingAttempts: player.weeklyRushingAttempts,
                weeklyRushingYards: player.weeklyRushingYards,
                weeklyRushingTouchdowns: player.weeklyRushingTouchdowns,
                weeklyFumblesLost: player.weeklyFumblesLost,
                weeklyReceivingTargets: player.weeklyReceivingTargets,
                weeklyReceptions: player.weeklyReceptions,
                weeklyReceivingYards: player.weeklyReceivingYards,
                weeklyReceivingTouchdowns: player.weeklyReceivingTouchdowns,
                weeklyTwoPointConversionPasses:
                  player.weeklyTwoPointConversionPasses,
                weeklyTwoPointConversionRuns:
                  player.weeklyTwoPointConversionRuns,
                weeklyTwoPointConversionReceptions:
                  player.weeklyTwoPointConversionReceptions,
                weeklyFantasyPoints: player.weeklyFantasyPoints,
                weeklyFantasyPointsPPR: player.weeklyFantasyPointsPPR,
                weeklyActive: player.weeklyActive,

                projWPassingAttempts: player.projWPassingAttempts,
                projWPassingCompletions: player.projWPassingCompletions,
                projWPassingYards: player.projWPassingYards,
                projWPassingTouchdowns: player.projWPassingTouchdowns,
                projWPassingInterceptions: player.projWPassingInterceptions,
                projWRushingAttempts: player.projWRushingAttempts,
                projWRushingYards: player.projWRushingYards,
                projWRushingTouchdowns: player.projWRushingTouchdowns,
                projWFumblesLost: player.projWFumblesLost,
                projWReceivingTargets: player.projWReceivingTargets,
                projWReceptions: player.projWReceptions,
                projWReceivingYards: player.projWReceivingYards,
                projWReceivingTouchdowns: player.projWReceivingTouchdowns,
                projWTwoPointConversionPasses:
                  player.projWTwoPointConversionPasses,
                projWTwoPointConversionRuns: player.projWTwoPointConversionRuns,
                projWTwoPointConversionReceptions:
                  player.projWTwoPointConversionReceptions,
                projWFantasyPoints: player.projWFantasyPoints,
                projWFantasyPointsPPR: player.projWFantasyPointsPPR,
                projWActive: player.projWActive,

                seasonPassingAttempts: player.seasonPassingAttempts,
                seasonPassingCompletions: player.seasonPassingCompletions,
                seasonPassingYards: player.seasonPassingYards,
                seasonPassingTouchdowns: player.seasonPassingTouchdowns,
                seasonPassingInterceptions: player.seasonPassingInterceptions,
                seasonRushingAttempts: player.seasonRushingAttempts,
                seasonRushingYards: player.seasonRushingYards,
                seasonRushingTouchdowns: player.seasonRushingTouchdowns,
                seasonFumblesLost: player.seasonFumblesLost,
                seasonReceivingTargets: player.seasonReceivingTargets,
                seasonReceptions: player.seasonReceptions,
                seasonReceivingYards: player.seasonReceivingYards,
                seasonReceivingTouchdowns: player.seasonReceivingTouchdowns,
                seasonTwoPointConversionPasses:
                  player.seasonTwoPointConversionPasses,
                seasonTwoPointConversionRuns:
                  player.seasonTwoPointConversionRuns,
                seasonTwoPointConversionReceptions:
                  player.seasonTwoPointConversionReceptions,
                seasonFantasyPoints: player.seasonFantasyPoints,
                seasonFantasyPointsPPR: player.seasonFantasyPointsPPR,

                projSPassingAttempts: player.projSPassingAttempts,
                projSPassingCompletions: player.projSPassingCompletions,
                projSPassingYards: player.projSPassingYards,
                projSPassingTouchdowns: player.projSPassingTouchdowns,
                projSPassingInterceptions: player.projSPassingInterceptions,
                projSRushingAttempts: player.projSRushingAttempts,
                projSRushingYards: player.projSRushingYards,
                projSRushingTouchdowns: player.projSRushingTouchdowns,
                projSFumblesLost: player.projSFumblesLost,
                projSReceivingTargets: player.projSReceivingTargets,
                projSReceptions: player.projSReceptions,
                projSReceivingYards: player.projSReceivingYards,
                projSReceivingTouchdowns: player.projSReceivingTouchdowns,
                projSTwoPointConversionPasses:
                  player.projSTwoPointConversionPasses,
                projSTwoPointConversionRuns: player.projSTwoPointConversionRuns,
                projSTwoPointConversionReceptions:
                  player.projSTwoPointConversionReceptions,
                projSFantasyPoints: player.projSFantasyPoints,
                projSFantasyPointsPPR: player.projSFantasyPointsPPR,
                averageDraftPosition: player.averageDraftPosition,
                averageDraftPositionPPR: player.averageDraftPositionPPR
              }).save()
            );
          });
          // console.log("finish 2", promiseArr)
          return Promise.all(promiseArr).then(resultArr => {
            // console.log(resultArr)
            return resultArr;
          });
        });
      }
    },

    updateAllPlayers: {
      type: new GraphQLList(PlayerType),
      resolve() {
        const promiseArr = [];
        const allPlayers = {};

        promiseArr.push(
          axios(seasonStats).then(res => {
            let seasonStatsArr = res.data;
            sortJsonArray(seasonStatsArr, "PlayerID");
            // console.log(seasonStatsArr[0].PlayerID);
            seasonStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                // allPlayers[`${player.PlayerID}`] = {};
                // console.log("4");
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }

                allPlayers[`${player.PlayerID}`][
                  "seasonPassingAttempts"
                ] = Math.round(player.PassingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingCompletions"
                ] = Math.round(player.PassingCompletions);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingYards"
                ] = Math.round(player.PassingYards);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingTouchdowns"
                ] = Math.round(player.PassingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "seasonPassingInterceptions"
                ] = Math.round(player.PassingInterceptions);
                allPlayers[`${player.PlayerID}`][
                  "seasonRushingAttempts"
                ] = Math.round(player.RushingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "seasonRushingYards"
                ] = Math.round(player.RushingYards);
                allPlayers[`${player.PlayerID}`][
                  "seasonRushingTouchdowns"
                ] = Math.round(player.RushingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "seasonFumblesLost"
                ] = Math.round(player.FumblesLost);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceivingTargets"
                ] = Math.round(player.ReceivingTargets);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceptions"
                ] = Math.round(player.Receptions);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceivingYards"
                ] = Math.round(player.ReceivingYards);
                allPlayers[`${player.PlayerID}`][
                  "seasonReceivingTouchdowns"
                ] = Math.round(player.ReceivingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "seasonTwoPointConversionPasses"
                ] = Math.round(player.TwoPointConversionPasses);
                allPlayers[`${player.PlayerID}`][
                  "seasonTwoPointConversionRuns"
                ] = Math.round(player.TwoPointConversionRuns);
                allPlayers[`${player.PlayerID}`][
                  "seasonTwoPointConversionReceptions"
                ] = Math.round(player.TwoPointConversionReceptions);
                allPlayers[`${player.PlayerID}`]["seasonFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["seasonFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
              }
            });
          })
        );

        promiseArr.push(
          axios(weeklyStats).then(res => {
            let weeklyStatsArr = res.data;
            sortJsonArray(weeklyStatsArr, "PlayerID");
            // console.log(weeklyStatsArr[0].PlayerID);
            weeklyStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                // allPlayers[`${player.PlayerID}`] = {};
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }

                // console.log("3");
                allPlayers[`${player.PlayerID}`]["isGameOver"] =
                  player.IsGameOver;
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingAttempts"
                ] = Math.round(player.PassingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingCompletions"
                ] = Math.round(player.PassingCompletions);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingYards"
                ] = Math.round(player.PassingYards);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingTouchdowns"
                ] = Math.round(player.PassingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyPassingInterceptions"
                ] = Math.round(player.PassingInterceptions);
                allPlayers[`${player.PlayerID}`][
                  "weeklyRushingAttempts"
                ] = Math.round(player.RushingAttempts);
                allPlayers[`${player.PlayerID}`][
                  "weeklyRushingYards"
                ] = Math.round(player.RushingYards);
                allPlayers[`${player.PlayerID}`][
                  "weeklyRushingTouchdowns"
                ] = Math.round(player.RushingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyFumblesLost"
                ] = Math.round(player.FumblesLost);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceivingTargets"
                ] = Math.round(player.ReceivingTargets);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceptions"
                ] = Math.round(player.Receptions);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceivingYards"
                ] = Math.round(player.ReceivingYards);
                allPlayers[`${player.PlayerID}`][
                  "weeklyReceivingTouchdowns"
                ] = Math.round(player.ReceivingTouchdowns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyTwoPointConversionPasses"
                ] = Math.round(player.TwoPointConversionPasses);
                allPlayers[`${player.PlayerID}`][
                  "weeklyTwoPointConversionRuns"
                ] = Math.round(player.TwoPointConversionRuns);
                allPlayers[`${player.PlayerID}`][
                  "weeklyTwoPointConversionReceptions"
                ] = Math.round(player.TwoPointConversionReceptions);
                allPlayers[`${player.PlayerID}`]["weeklyFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["weeklyFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
                allPlayers[`${player.PlayerID}`]["weeklyActive"] =
                  player.Active;
              }
            });
          })
        );

        promiseArr.push(
          axios(projWeeklyStats).then(res => {
            let projWeeklyStatsArr = res.data;
            sortJsonArray(projWeeklyStatsArr, "PlayerID");
            // console.log(projWeeklyStatsArr[0].PlayerID);
            projWeeklyStatsArr.forEach(player => {
              if (
                player.Position === "QB" ||
                player.Position === "RB" ||
                player.Position === "WR" ||
                player.Position === "TE"
              ) {
                if (allPlayers[`${player.PlayerID}`] === undefined) {
                  allPlayers[`${player.PlayerID}`] = {};
                  allPlayers[`${player.PlayerID}`]["name"] = player.Name;
                  allPlayers[`${player.PlayerID}`]["team"] = player.Team;
                  allPlayers[`${player.PlayerID}`]["position"] =
                    player.Position;
                }
                // console.log("2");
                allPlayers[`${player.PlayerID}`]["projWPassingAttempts"] =
                  player.PassingAttempts;
                allPlayers[`${player.PlayerID}`]["projWPassingCompletions"] =
                  player.PassingCompletions;
                allPlayers[`${player.PlayerID}`]["projWPassingYards"] =
                  player.PassingYards;
                allPlayers[`${player.PlayerID}`]["projWPassingTouchdowns"] =
                  player.PassingTouchdowns;
                allPlayers[`${player.PlayerID}`]["projWPassingInterceptions"] =
                  player.PassingInterceptions;
                allPlayers[`${player.PlayerID}`]["projWRushingAttempts"] =
                  player.RushingAttempts;
                allPlayers[`${player.PlayerID}`]["projWRushingYards"] =
                  player.RushingYards;
                allPlayers[`${player.PlayerID}`]["projWRushingTouchdowns"] =
                  player.RushingTouchdowns;
                allPlayers[`${player.PlayerID}`]["projWFumblesLost"] =
                  player.FumblesLost;
                allPlayers[`${player.PlayerID}`]["projWReceivingTargets"] =
                  player.ReceivingTargets;
                allPlayers[`${player.PlayerID}`]["projWReceptions"] =
                  player.Receptions;
                allPlayers[`${player.PlayerID}`]["projWReceivingYards"] =
                  player.ReceivingYards;
                allPlayers[`${player.PlayerID}`]["projWReceivingTouchdowns"] =
                  player.ReceivingTouchdowns;
                allPlayers[`${player.PlayerID}`][
                  "projWTwoPointConversionPasses"
                ] = player.TwoPointConversionPasses;
                allPlayers[`${player.PlayerID}`][
                  "projWTwoPointConversionRuns"
                ] = player.TwoPointConversionRuns;
                allPlayers[`${player.PlayerID}`][
                  "projWTwoPointConversionReceptions"
                ] = player.TwoPointConversionReceptions;
                allPlayers[`${player.PlayerID}`]["projWFantasyPoints"] =
                  player.FantasyPoints;
                allPlayers[`${player.PlayerID}`]["projWFantasyPointsPPR"] =
                  player.FantasyPointsPPR;
                allPlayers[`${player.PlayerID}`]["projWActive"] = player.Active;
              }
            });
          })
        );

        console.log("finish 1", promiseArr);

        return Promise.all(promiseArr).then(() => {
          let promiseArr = [];
          // console.log("begin 2", allPlayers)
          return Player.find({}).then(oldPlayers => {
            oldPlayers.forEach(oldPlayer => {
              Object.values(allPlayers).forEach(player => {
                if (
                  player.name === oldPlayer.name &&
                  player.team === oldPlayer.team
                ) {
                  console.log(`found one, ${oldPlayer.name}`); //left in because I run other queries too fast
                  oldPlayer.weeklyPassingAttempts =
                    player.weeklyPassingAttempts;

                  oldPlayer.weeklyPassingCompletions =
                    player.weeklyPassingCompletions;
                  oldPlayer.weeklyPassingYards = player.weeklyPassingYards;
                  oldPlayer.weeklyPassingTouchdowns =
                    player.weeklyPassingTouchdowns;
                  oldPlayer.weeklyPassingInterceptions =
                    player.weeklyPassingInterceptions;
                  oldPlayer.weeklyRushingAttempts =
                    player.weeklyRushingAttempts;
                  oldPlayer.weeklyRushingYards = player.weeklyRushingYards;
                  oldPlayer.weeklyRushingTouchdowns =
                    player.weeklyRushingTouchdowns;
                  oldPlayer.weeklyFumblesLost = player.weeklyFumblesLost;
                  oldPlayer.weeklyReceivingTargets =
                    player.weeklyReceivingTargets;
                  oldPlayer.weeklyReceptions = player.weeklyReceptions;
                  oldPlayer.weeklyReceivingYards = player.weeklyReceivingYards;
                  oldPlayer.weeklyReceivingTouchdowns =
                    player.weeklyReceivingTouchdowns;
                  oldPlayer.weeklyTwoPointConversionPasses =
                    player.weeklyTwoPointConversionPasses;
                  oldPlayer.weeklyTwoPointConversionRuns =
                    player.weeklyTwoPointConversionRuns;
                  oldPlayer.weeklyTwoPointConversionReceptions =
                    player.weeklyTwoPointConversionReceptions;
                  oldPlayer.weeklyFantasyPoints = player.weeklyFantasyPoints;
                  oldPlayer.weeklyFantasyPointsPPR =
                    player.weeklyFantasyPointsPPR;
                  oldPlayer.weeklyActive = player.weeklyActive;

                  oldPlayer.projWPassingAttempts = player.projWPassingAttempts;
                  oldPlayer.projWPassingCompletions =
                    player.projWPassingCompletions;
                  oldPlayer.projWPassingYards = player.projWPassingYards;
                  oldPlayer.projWPassingTouchdowns =
                    player.projWPassingTouchdowns;
                  oldPlayer.projWPassingInterceptions =
                    player.projWPassingInterceptions;
                  oldPlayer.projWRushingAttempts = player.projWRushingAttempts;
                  oldPlayer.projWRushingYards = player.projWRushingYards;
                  oldPlayer.projWRushingTouchdowns =
                    player.projWRushingTouchdowns;
                  oldPlayer.projWFumblesLost = player.projWFumblesLost;
                  oldPlayer.projWReceivingTargets =
                    player.projWReceivingTargets;
                  oldPlayer.projWReceptions = player.projWReceptions;
                  oldPlayer.projWReceivingYards = player.projWReceivingYards;
                  oldPlayer.projWReceivingTouchdowns =
                    player.projWReceivingTouchdowns;
                  oldPlayer.projWTwoPointConversionPasses =
                    player.projWTwoPointConversionPasses;
                  oldPlayer.projWTwoPointConversionRuns =
                    player.projWTwoPointConversionRuns;
                  oldPlayer.projWTwoPointConversionReceptions =
                    player.projWTwoPointConversionReceptions;
                  oldPlayer.projWFantasyPoints = player.projWFantasyPoints;
                  oldPlayer.projWFantasyPointsPPR =
                    player.projWFantasyPointsPPR;
                  oldPlayer.projWActive = player.projWActive;

                  oldPlayer.seasonPassingAttempts =
                    player.seasonPassingAttempts;
                  oldPlayer.seasonPassingCompletions =
                    player.seasonPassingCompletions;
                  oldPlayer.seasonPassingYards = player.seasonPassingYards;
                  oldPlayer.seasonPassingTouchdowns =
                    player.seasonPassingTouchdowns;
                  oldPlayer.seasonPassingInterceptions =
                    player.seasonPassingInterceptions;
                  oldPlayer.seasonRushingAttempts =
                    player.seasonRushingAttempts;
                  oldPlayer.seasonRushingYards = player.seasonRushingYards;
                  oldPlayer.seasonRushingTouchdowns =
                    player.seasonRushingTouchdowns;
                  oldPlayer.seasonFumblesLost = player.seasonFumblesLost;
                  oldPlayer.seasonReceivingTargets =
                    player.seasonReceivingTargets;
                  oldPlayer.seasonReceptions = player.seasonReceptions;
                  oldPlayer.seasonReceivingYards = player.seasonReceivingYards;
                  oldPlayer.seasonReceivingTouchdowns =
                    player.seasonReceivingTouchdowns;
                  oldPlayer.seasonTwoPointConversionPasses =
                    player.seasonTwoPointConversionPasses;
                  oldPlayer.seasonTwoPointConversionRuns =
                    player.seasonTwoPointConversionRuns;
                  oldPlayer.seasonTwoPointConversionReceptions =
                    player.seasonTwoPointConversionReceptions;
                  oldPlayer.seasonFantasyPoints = player.seasonFantasyPoints;
                  oldPlayer.seasonFantasyPointsPPR =
                    player.seasonFantasyPointsPPR;

                  promiseArr.push(oldPlayer.save());
                }
              });
            });
            return Promise.all(promiseArr).then(resultArr => {
              // console.log(resultArr)
              return resultArr;
              // console.log("endpoint-player", player);
            });
          });
        });
      }
    },
    deleteAllPlayers: {
      type: PlayerType,
      resolve() {
        return Player.deleteMany({});
      }
    },
    newTeam: {
      type: TeamType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        user: { type: GraphQLID },
        league: { type: GraphQLID }
      },
      resolve(parentValue, { name, description, user, league }) {
        return new Team({ name, description, user, league }).save();
      }
    },
    // add dependent removal of players on team
    deleteTeam: {
      type: TeamType,
      args: { teamId: { type: GraphQLID } },
      resolve(parentValue, { teamId }) {
        return Team.removePlayersAndDestroy(teamId);
      }
    },
    //adds player association to team, and userTeam association to plauer and handles sets that player id to owned in that league
    addPlayerToTeam: {
      type: PlayerType,
      args: {
        playerId: { type: GraphQLID },
        teamId: { type: GraphQLID }
      },
      resolve(parentValue, { playerId, teamId }) {
        return Player.addPlayerToTeam(playerId, teamId);
      }
    },
    // removes player from team, and team from player and releases player to non-owned status
    removePlayerFromTeam: {
      type: PlayerType,
      args: {
        playerId: { type: GraphQLID },
        teamId: { type: GraphQLID }
      },
      resolve(parentValue, { playerId, teamId }) {
        return Player.removePlayerFromTeam(playerId, teamId);
      }
    },
    filteredPlayers: {
      type: new GraphQLList(PlayerType),
      args: {
        leagueId: { type: GraphQLID }
      },
      resolve(parentValue, { leagueId }) {
        return Player.filteredPlayers(leagueId);
      }
    },
    // creates league and adds commisioner as the first team and user
    newLeague: {
      type: LeagueType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        comissioner: { type: GraphQLID }
      },
      resolve(parentValue, { name, description, comissioner }) {
        let promiseArr = [];
        promiseArr.push(new League({ name, description, comissioner }).save());
        return Promise.all(promiseArr).then(resultArr => {
          let league = resultArr[0]._id;
          console.log(league);
          User.addUserToLeagueAndCreateTeam(comissioner, league);
          console.log(resultArr[0]);
          return resultArr[0];
        });
      }
    },
    // add dependent delete of associated teams on League, also maybe players later on depending on how that is implemented
    deleteLeague: {
      type: LeagueType,
      args: { leagueId: { type: GraphQLID } },
      resolve(parentValue, { leagueId }) {
        return League.deleteTeamsAndDestroy(leagueId);
      }
    },
    // (think its good)
    addUserToLeagueAndCreateTeam: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        leagueId: { type: GraphQLID }
      },
      resolve(parentValue, { userId, leagueId }) {
        return User.addUserToLeagueAndCreateTeam(userId, leagueId);
      }
    },
    // removes team from a league and deletes that team <- this also does the players and user from team so need to remove user from league as well
    // pass in team and leaugeId and use the team to find the user I think
    removeTeamAndUserFromLeague: {
      type: TeamType,
      args: {
        teamId: { type: GraphQLID },
        leagueId: { type: GraphQLID }
      },
      resolve(parentValue, { teamId, leagueId }) {
        return Team.removeTeamAndUserFromLeague(teamId, leagueId);
      }
    },
    createAllLeaguePlayers: {
      type: LeagueType,
      args: {
        leagueId: { type: GraphQLID }
      },
      resolve(parentValue, { leagueId }) {
        let promiseArr = [];
        // League.findById(leagueId).then(league => {
        // console.log(league)
        return Player.find({}).then(players => {
          return League.findById(leagueId).then(league => {
            players.forEach(player => {
              promiseArr.push(
                new OwnedPlayer({
                  playerId: player._id,
                  leagueOwned: false,
                  leagueId: league._id
                }).save()
              );
              //  console.log(ownedPlayerObject)
              // promiseArr.push(ownedPlayerObject.save())
              // promiseArr.push(league.ownedPlayers.push(ownedPlayerObject));
            });
            return Promise.all(promiseArr).then(ownedPlayers => {
              // let promiseArr = [];
              console.log(ownedPlayers);
              ownedPlayers.forEach(ownedPlayer => {
                league.ownedPlayers.push(ownedPlayer._id);
              });
              return league.save();
              // return Promise.all(promiseArr).then(resultArr => {
              //   // console.log(resultArr)
              //   return resultArr
              // })
            });
          });
        });
        // console.log(league.ownedPlayers);
        // })
      }
    }
  }
});

module.exports = mutation;
