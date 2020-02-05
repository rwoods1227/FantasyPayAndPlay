import gql from "graphql-tag";

export default {
  // we make sure to use the `mutation` key word when creating our frontend mutations
  // just like we would in GraphiQL
  REGISTER: gql`
    mutation RegisterUser($username: String, $email: String, $password: String) {
      register(email: $email, username: $username password: $password) {
        _id,
        email,
        username,
        loggedIn,
        token
      }
    }
  `,
  LOGOUT: gql`
    mutation LogoutUser($id: ID) {
      logout(id: $id) {
        _id,
        loggedIn,
        token
      }
    }
  `,
  LOGIN: gql`
    mutation LoginUser($email: String, $password: String) {
      login(email: $email, password: $password) {
        _id,
        email,
        username,
        loggedIn,
        token
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  CREATE_USER_BET: gql`
    mutation CreateUserBet($betId: ID, $userId: ID, $value: Int) {
      createUserBet(betId: $betId, userId: $userId, value: $value) {
        bet {
          _id
        }
        user {
          _id
        }
        value
      }
    }
  `,
  NEW_LEAGUE: gql`
    mutation NewLeague($name: String, $description: String, $comissioner: ID) {
      newLeague(name: $name, description: $description, comissioner: $comissioner) {
        _id
        name
        description
        comissioner
      }
    }
  `,
  ADD_USER_TO_LEAGUE_AND_CREATE_TEAM: gql`
    mutation AddUserToLeagueAndCreateTeam($userId: ID, $leagueId: ID) {
      addUserToLeagueAndCreateTeam(userId: $userId, leagueId: $leagueId) {
        _id
      }
    }
  `,
  //this assigns win value and then updates the bets.. hopefully
  ALL_BET_WIN_VALUES: gql`
    mutation allBetWinValues{
      allBetWinValues{
        _id
      }
    }
  `
};