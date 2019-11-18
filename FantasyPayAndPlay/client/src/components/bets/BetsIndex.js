import React, { useState } from 'react';
import BetsList from "./BetsList";
import { Link } from "react-router-dom";

require("./bets_list.css");
require("./scrollbar.css");

const BetsIndex = ({ changeMain }) => {
  const [tab, setTab] = useState({
    matchType: "upcoming"
  });

  const handletabChange = matchType => event => {
    event.persist();
    setTab(tab => ({ ...tab, matchType }));
  };

  let signedInUser = localStorage.getItem("currentUserId");

  return (
    <div className="bets-container">
      <div className="header">
        <div className="bets-icon"></div>
        <div className="header-content">
          <h1>Bets</h1>
          <span>All of this weeks matches</span>
          <div className="link-to-user-profile">
            <Link to={`users/${signedInUser}`}>My Profile</Link>
          </div>
        </div>
      </div>
      <div className="bets-tabs-container">
        <div 
          className={tab.matchType === "upcoming" ? "tab selected" : "tab"}
          onClick={handletabChange("upcoming")}
        >
          <span>Upcoming</span>
        </div>
        <div 
          className={tab.matchType === "past" ? "tab selected" : "tab"}
          onClick={handletabChange("past")}
        >
          <span>Completed</span>
        </div>
      </div>
      <BetsList matchType={tab.matchType} changeMain={changeMain} />
    </div>
  );
}

export default BetsIndex;