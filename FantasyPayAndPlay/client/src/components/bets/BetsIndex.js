import React, { useState } from 'react';
import BetsList from "./BetsList";

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

  return (
    <div className="bets-page">
      <div className="bets-container">
        <h1>Bets</h1>
        <span>All of this weeks matches</span>
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
        <BetsList matchType={tab.matchType} />
      </div>
    </div>
  )
}

export default BetsIndex;