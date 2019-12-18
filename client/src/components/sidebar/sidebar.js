import React, { useState } from 'react';

import BetsIndex from "../bets/BetsIndex";
import LeagueSplash from "../league/LeagueSplash";

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
            className={`sidebar-item${sidebar.selected === "league" ? " selected" : ""}`}
            onClick={() => {
              setSelected(sidebar => ({...sidebar, selected: "league"}));
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
        <li>
          <div 
            className={`sidebar-item${sidebar.selected === "bets" ? " selected" : ""}`}
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
      </ul>
    </div>
  );
};

export default SideBar;