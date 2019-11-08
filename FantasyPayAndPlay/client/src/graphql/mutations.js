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
};