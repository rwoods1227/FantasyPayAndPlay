import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";


const UserProfile = (props) => {

  const FETCH_USER = gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id) {
        username
        balance
        email
      }
    }
  `;

  return (
    <ul className="bets-list">
      <Query query={FETCH_USER} variables={{ _id: props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading..</h1>;
          if (error) console.log(error);
          console.log(data)
          return (
          <div>
            <h1>Username: {data.user.username}</h1>
            <h2>Balance: ${data.user.balance}</h2>
          </div> 
          )
        }}
      </Query>
    </ul>
  );
};

export default UserProfile