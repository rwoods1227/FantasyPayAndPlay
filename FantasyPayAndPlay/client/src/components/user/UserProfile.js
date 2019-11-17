import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
const { FETCH_USER } = Queries;



const UserProfile = (props) => {
  return (
    <ul className="bets-list">
      <Query query={FETCH_USER}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading..</h1>;
          if (error) console.log(error);
          // console.log(data);
          return <h1>user profile</h1>;
        }}
      </Query>
    </ul>
  );
};

export default UserProfile