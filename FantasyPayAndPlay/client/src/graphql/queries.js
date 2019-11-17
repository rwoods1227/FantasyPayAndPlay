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
  FETCH_USER: gql`
    query FetchUser($id: ID!) {
      user(id: $id) {
        username
        balance
        email
      }
    }
  `,
  FETCH_USERS: gql`
    query FetchUsers {
      users {
        _id
        balance
        username
      }
    }
  `
};