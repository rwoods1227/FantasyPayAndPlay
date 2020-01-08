import React from 'react';
import { Link, Route } from "react-router-dom"
import BetsIndex from "../bets/BetsIndex";
import Credit from "../main/Credit"


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
        <li>
          <Link to={`/credits`}>
            <div className="sidebar-item selected">
              <div className="sidebar-item-icon bets"></div>
              <div className="sidebar-item-content">
                <h3>Credits</h3>
                <span>Check out our Github accounts</span>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;