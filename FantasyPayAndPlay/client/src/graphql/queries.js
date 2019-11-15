import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_BETS: gql`
    query FetchBets {
      bets {
        _id
        description
        details
        date
        line
        win
      }
    }
  `,
  FETCH_BET: gql`
    query FetchBet($_id: ID!) {
      bet(_id: $_id) {
        _id
        description
        details
        date
        line
        win
      }
    }
  `,
  FETCH_BET_TYPES: gql`
    query FetchBetTypes($description: String!) {
      betTypes(description: $description) {
        _id
        description
        details
        date
        line
        win
      }
    }
  `,
  FETCH_PLAYERS: gql`
    query FetchPlayers {
      players {
        _id
        name
        team
        position

        projSFantasyPoints
        seasonFantasyPoints
        averageDraftPosition

        projSRushingAttempts
        projSRushingYards
        projSRushingTouchdowns

        projSReceptions
        projSReceivingTargets
        projSReceivingYards
        projSReceivingTouchdowns

        projSPassingCompletions
        projSPassingAttempts
        projSPassingYards
        projSPassingTouchdowns

        seasonRushingAttempts
        seasonRushingYards
        seasonRushingTouchdowns

        seasonReceptions        
        seasonReceivingTargets
        seasonReceivingYards
        seasonReceivingTouchdowns

        seasonPassingCompletions
        seasonPassingAttempts
        seasonPassingYards
        seasonPassingTouchdowns

        projWFantasyPoints
        weeklyFantasyPoints

        projWRushingAttempts
        projWRushingYards
        projWRushingTouchdowns

        projWReceptions
        projWReceivingTargets
        projWReceivingYards
        projWReceivingTouchdowns

        projWPassingCompletions
        projWPassingAttempts
        projWPassingYards
        projWPassingTouchdowns

        weeklyRushingAttempts
        weeklyRushingYards
        weeklyRushingTouchdowns

        weeklyReceptions
        weeklyReceivingTargets
        weeklyReceivingYards
        weeklyReceivingTouchdowns

        weeklyPassingCompletions
        weeklyPassingAttempts
        weeklyPassingYards
        weeklyPassingTouchdowns
      }
    }
  `
};