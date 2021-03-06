import { Link, Route } from "react-router-dom"
import Credit from "../main/Credit"
import React, { useState } from 'react';
import BetsIndex from "../bets/BetsIndex";
import LeagueSplash from "../league/LeagueSplash";
import LeagueShow from "../league/LeagueShow";
import Credits from "../main/Credit"
import Queries from "../../graphql/queries";
import { Query } from 'react-apollo';
const { FETCH_USER_LEAGUES } = Queries;

require("./sidebar.css");
require("./sidebar_icons.css");

const SideBar = ({ changeMain }) => {
  const [sidebar, setSelected] = useState({
    selected: "bets"
  });

  return (
    <div className="sidebar">
      <ul>
        <li>
          <div
            className={`sidebar-item${
              sidebar.selected === "bets" ? " selected" : ""
            }`}
            onClick={() => {
              setSelected(sidebar => ({ ...sidebar, selected: "bets" }));
              changeMain(BetsIndex, { changeMain });
            }}
          >
            <div className="sidebar-item-icon bets"></div>
            <div className="sidebar-item-content">
              <h3>Bets</h3>
              <span>Check out matches to bet on</span>
            </div>
          </div>
        </li>
        <li>
          <div
            className={`sidebar-item${
              sidebar.selected === "credits" ? " selected" : ""
              }`}
            onClick={() => {
              setSelected(sidebar => ({ ...sidebar, selected: "credits" }));
              changeMain(Credits, { changeMain });
            }}
          >
            <div className="sidebar-item-icon credits"></div>
            <div className="sidebar-item-content">
              <h3>Credits</h3>
              <span>Check out our Github accounts</span>
            </div>
          </div>
        </li>
        {/* <li>
          <Link to={`/credits`}>
            <div className="sidebar-item credits-sidebar-option">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                className="sidebar-item-icon bets sidebar-credits-icon"
              ></img>
              <div className="sidebar-item-content">
                <h3>Credits</h3>
                <span>Check out our Github accounts</span>
              </div>
            </div>
          </Link>
        </li> */}
        <li>
          <div
            className={`sidebar-item${
              sidebar.selected === "league" ? " selected" : ""
            }`}
            onClick={() => {
              setSelected(sidebar => ({ ...sidebar, selected: "league" }));
              changeMain(LeagueSplash, { changeMain });
            }}
          >
            <div className="sidebar-item-icon league"></div>
            <div className="sidebar-item-content">
              <h3>League</h3>
              <span>Create or join a league</span>
            </div>
          </div>
        </li>
      </ul>
      <div className="league-index">
        <h2>Leagues</h2>
        <div className="league-list-container">
          <Query
            query={FETCH_USER_LEAGUES}
            variables={{ _id: localStorage.getItem("currentUserId") }}
            pollInterval={1000}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;

              return (
                <div className="league-list">
                  <ul className="side-leagues-list">
                    {data.user.leagues.map(league => (
                      <li key={league._id}>
                        <div
                          className={`sidebar-item${
                            sidebar.selected === league._id ? " selected" : ""
                          }`}
                          onClick={() => {
                            setSelected(sidebar => ({
                              ...sidebar,
                              selected: league._id
                            }));
                            changeMain(LeagueShow, {
                              changeMain,
                              _id: league._id
                            });
                          }}
                        >
                          <div className="sidebar-item-content">
                            <h3>{league.name}</h3>
                            <span>{league.description}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default SideBar;