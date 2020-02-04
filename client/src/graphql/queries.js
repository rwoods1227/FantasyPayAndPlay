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
  }`,
  FETCH_USERS: gql`
    query FetchUsers {
      users {
        _id
        balance
        username
      }
    }
  `,
  FETCH_USER_LEAGUES: gql`
    query FetchUserLeagues($_id: ID!) {
      user(_id: $_id) {
        leagues {
          _id
          name
          description
        }
      }
    }
  `,
  FETCH_LEAGUE: gql`
    query FetchLeague($_id: ID!) {
      league(_id: $_id) {
        _id
        name
        description
        comissioner
        teams {
          name
          user
          players {
            name
            position
            seasonFantasyPoints
          }
        }
      }
    }
  `,
  FETCH_USER: gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id) {
        username
        balance
        email
      }
    }
  `
};