import React from 'react';
import CreateLeagueForm from "./CreateLeagueForm";
import JoinLeagueForm from "./JoinLeagueForm";
import { Query } from 'react-apollo'
import Queries from "../../graphql/queries";
const { FETCH_LEAGUES } = Queries;

require("./league_splash.css");
// eventually add Fetch leagues, (new query with small data intake;  ids users?) query here so that leagues can be passed into
// components and new errors added like (already in league, league id does not match leagues)
const LeagueSplash = ({ changeMain }) => {
  return(
  <Query query={FETCH_LEAGUES}>{({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
  return (
    <div className="league-container">
      <div className="header">
        <div className="header-icon league-icon"></div>
        <div className="header-content">
          <h1>League</h1>
          <span>Play fantasy football</span>
        </div>
      </div>
      <div className="league-content">
        <h2>Create a League</h2>
        <CreateLeagueForm />
        <h2>Join a League</h2>
        <JoinLeagueForm leagues={data.leagues}/>
      </div>
    </div>
  );
  }}
  </Query>
  );
}

export default LeagueSplash;