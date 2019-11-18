import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

// require("./user_index.css")


const UserProfile = (props) => {

  const FETCH_USER = gql`
    query FetchUser($_id: ID!) {
      user(_id: $_id) {
        username
        balance
        email
        userBet {
          value
          bet {
            details
            description
            wagerType
            line
            win
          }
        }
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
          let userBetHistory = data.user.userBet.map(game => {
            return (
              <div>
                <li>Matchup: {game.bet.description}</li>
                <li>Details: {game.bet.details}</li>
                <li>Amount wagered: {game.bet.value}</li>
                <li>Won: {game.bet.win}</li>
                <li>Line: {game.bet.line}</li>
              </div>
            )
          })
          return (
            <div className="user-detail-container">
              <div className="user-profile-info">
                <h1 className="profile-info-text">Username: {data.user.username}</h1>
                <h2 className="profile-info-text money-color">Balance: ${data.user.balance}</h2>
              </div>
              <div>
                <h1>Users Betting History</h1>
                {userBetHistory}
              </div>
            </div>
          );
        }}
      </Query>
    </ul>
  );
};

export default UserProfile