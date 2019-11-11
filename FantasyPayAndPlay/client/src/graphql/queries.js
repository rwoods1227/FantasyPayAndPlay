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
        line
        win
      }
    }
  `,
};