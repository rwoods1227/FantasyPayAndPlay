import React, { useState } from 'react';
import MyTeam from "./MyTeam";
import TeamIndex from "./TeamIndex";
import MatchUp from "./MatchUp";
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
  const getCurrentContent = () => {
    switch (tab.currentTab) {
      case "my team":
        return (
          <MyTeam />
        );
      case "teams":
        return (
          <TeamIndex />
        );
      case "matchup":
        return (
          <MatchUp />
        )
      default:
        return (
          <div>error</div>
        );
    }
  }

  return (
    <Query
      query={FETCH_LEAGUE}
      variables={{ _id }}
    >{({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
        <div className="league-show-container">
          <div className="header">
            <div className="header-content">
              <h1>{data.league.name}</h1>
              <span>{data.league.description}</span>
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
              className={tab.currentTab === "matchup" ? "tab selected" : "tab"}
              onClick={handletabChange("matchup")}
            >
              <span>Matchup</span>
            </div>
          </div>
          <div className="league-show-content-container">
            {getCurrentContent()}
          </div>
        </div>
      );
    }}
    </Query>
  );
}

export default LeagueShow;