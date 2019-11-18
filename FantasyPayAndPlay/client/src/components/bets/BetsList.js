import React from 'react';
import Queries from '../../graphql/queries';
import { Query } from 'react-apollo';
import { Link } from "react-router-dom";
import BetDetail from "./BetDetail";
const { FETCH_BETS } = Queries;

const BetsList = ({ matchType, changeMain }) => {
  return (
    <ul className="bets-list">
      <Query query={FETCH_BETS}>{({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        
        let weeksGames = [];
        data.bets.forEach(bet => weeksGames.some(b => b.description === bet.description) ? null : weeksGames.push(bet));
        let now = new Date();
        let pastGames = weeksGames.filter(game => (Date.parse(game.date) < now));
        let upcomingGames = weeksGames.filter(game => (Date.parse(game.date) > now));
        let viewableGames = matchType === "past" ? pastGames : upcomingGames;
        
        return viewableGames.map(({ _id, description, details, date }) => (
          <li key={_id}>
            {matchType === "upcoming" ? 
              <div 
                className="bets-item"
                onClick={() => changeMain(BetDetail, { matchId: _id, changeMain})}
              >
                <span className="bet-item-date">{date.slice(0,10)}</span>
                <span>{date.slice(11)}</span>
                <span className="bet-item-description">{description}</span>
              </div> :
              <div className="bets-item">
                <span className="bet-item-date">{date.slice(0, 10)}</span>
                <span>{date.slice(11)}</span>
                <span className="bet-item-description">{description}</span>
              </div>
            }
          </li>
        ));
      }}
      </Query>
    </ul>
  );
};

export default BetsList;