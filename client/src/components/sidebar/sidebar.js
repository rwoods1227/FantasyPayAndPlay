import React from 'react';

import BetsIndex from "../bets/BetsIndex";

require("./sidebar.css");

const SideBar = ({ changeMain }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <div 
            className="sidebar-item selected"
            onClick={() => changeMain(BetsIndex, { changeMain })}
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