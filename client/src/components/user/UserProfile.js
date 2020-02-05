import React from "react";
import Queries from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import UpdateBalanceButton from "./UpdateBalance"
import footballPic from "../../assets/footballPic.png"
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
      <Query
        query={FETCH_USER}
        variables={{ _id: props.match.params.id }}
        pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading..</h1>;
          if (error) console.log(error);
          let userBetHistory = data.user.userBet.reverse().map((game, idx) => {
              let checkWinLoss
              if (game.bet.win === 0) {
                checkWinLoss = "Pending"
              } else if (game.bet.win === -1) {
                checkWinLoss = "Lost"
              } else if (game.bet.win === 1) {
                checkWinLoss = "Won"
              } else if (game.bet.win === 2) {
                checkWinLoss = "Push"
              }
              
            return (
              <div className="game-box">
                <li>Matchup: {game.bet.description}</li>
                <li>Bet Description: {game.bet.details}</li>
                <li>Amount wagered: ${game.value}</li>
                <li>Won/Lost: <span className={`check-win-loss-${checkWinLoss} inline-ele`}>{checkWinLoss}</span></li>
                {/* <li>Won/Lost: {game.bet.win}</li> */}
                <li>Line: {game.bet.line}</li>
              </div>
            );
          });
          return (
            <div className="user-detail-container">
              <div className="user-profile-info">
                <div className="user-profile-info-container">
                  <h1 className="profile-info-text">
                    Username: {data.user.username}
                  </h1>
                  <h2 className="profile-info-text money-color">
                    Balance: ${data.user.balance}
                  </h2>
                  <Link
                    className="profile-info-text"
                    id="back-to-bets-hover"
                    to={`/app`}
                  >
                    Back To Bets
                  </Link>
                </div>
                <div className="user-profile-info-container-v2">
                  <div className="update-user-balance">
                    <UpdateBalanceButton />
                  </div>
                </div>

                <div className="user-profile-info-container-v2">
                  <p className="explanation-para">
                    Currently, the football season is over. So weekly updates timed with future football weeks are not functional. For demo purposes, the season-week is hard-coded 
                    and calling update balance takes into account all bets for this week. This works as designed, but may look slightly off in the offseason, as bets are assigned win/loss ahead of the update call.
                  </p>
                </div>
                {/* <img
                  className="user-profile-earnings-photo"
                  src={footballPic}
                /> */}
              </div>
              <div className="betting-history-div">
                <h1 className="users-betting-history">Users Betting History</h1>
                <div className="overflow-none-container">{userBetHistory}</div>
              </div>
            </div>
          );
        }}
      </Query>
    </ul>
  );
};

export default UserProfile