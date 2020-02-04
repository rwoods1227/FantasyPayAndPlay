import React, { useState } from 'react';
import MyTeam from "./MyTeam";
import TeamIndex from "./TeamIndex";
import MatchUp from "./MatchUp";
import AddPlayers from "../players/AddPlayers";
import { Query } from 'react-apollo'
import Queries from "../../graphql/queries";
const { FETCH_LEAGUE, FETCH_USER } = Queries;

require("./league_show.css");

const LeagueShow = ({ _id }) => {
  const [tab, setTab] = useState({
    currentTab: "my team"
  });

  const handletabChange = currentTab => event => {
    event.persist();
    setTab(tab => ({ ...tab, currentTab }));
  };

  /*
  import the component you want to render
  and make a case for it like so then
  make sure there's a tab for it to setTab to your content
  */
  const getCurrentContent = teams => {
    switch (tab.currentTab) {
      case "my team":
        return (
          <MyTeam teams={teams} />
        );
      case "teams":
        return (
          <TeamIndex teams={teams} />
        );
      case "matchup":
        return (
          <MatchUp />
        );
      case "add players":
        return (
          <AddPlayers />
        );
      default:
        return (
          <div>error</div>
        );
    }
  }
// all data sent to tabs comes from fetch_league so if more data is needed that will need to update as well
  return (
    <Query
      query={FETCH_LEAGUE}
      variables={{ _id }}
    >{({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      console.log(data);
      return (
        <div className="league-show-container">
          <div className="header">
            <div className="header-content">
              <h1>{data.league.name}</h1>
              <span>{data.league.description}</span>
              <span>{`Invite Friends to join with this League ID: ${data.league._id}`}</span>
            </div>
          </div>
          <div className="league-show-tabs-container">
            <div
              style={{zIndex: 5}}
              className={tab.currentTab === "my team" ? "tab selected" : "tab"}
              onClick={handletabChange("my team")}
            >
              <span>My Team</span>
            </div>
            <div
              style={{ zIndex: 4 }}
              className={tab.currentTab === "teams" ? "tab selected" : "tab"}
              onClick={handletabChange("teams")}
            >
              <span>Teams</span>
            </div>
            <div
              style={{ zIndex: 3 }}
              className={tab.currentTab === "matchup" ? "tab selected" : "tab"}
              onClick={handletabChange("matchup")}
            >
              <span>Matchup</span>
            </div>
            <div
              style={{ zIndex: 2 }}
              className={tab.currentTab === "add players" ? "tab selected" : "tab"}
              onClick={handletabChange("add players")}
            >
              <span>Add Players</span>
            </div>
          </div>
          <div className="league-show-content-container">
            {getCurrentContent(data.league.teams)}
          </div>
        </div>
      );
    }}
    </Query>
  );
}

export default LeagueShow;