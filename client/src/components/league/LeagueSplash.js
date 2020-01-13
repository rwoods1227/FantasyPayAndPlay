import React from 'react';
import CreateLeagueForm from "./CreateLeagueForm";
import JoinLeagueForm from "./JoinLeagueForm";

require("./league_splash.css");

const LeagueSplash = ({ changeMain }) => {
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
        <JoinLeagueForm />
      </div>
    </div>
  );
}

export default LeagueSplash;