import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
const { FETCH_USERS } = Queries;

const UserIndex = props => {
  return (
    <ul className="bets-list">
      <Query query={FETCH_USERS}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading..</h1>;
          if (error) console.log(error);
          let userBase = data.users.map(user => {  
            return (
              <div className="bets-item" key={user._id}>
                <Link to={{
                  pathname: `users/${user._id}`,
                  state: { user: user }
                }}>
                  <h1 className="bet-item-date">{user.username}</h1>
                  {console.log(user)}
                </Link>
              </div>
            );
          })

          return (
            <div className="bets-container">
              <h1>Users</h1>
              <span>Search for a username to view their stats</span>
              <div className="bets-tabs-container">
                {userBase}
              </div>
            </div>
          );
        }}
      </Query>
    </ul>
  );
};

export default UserIndex;
