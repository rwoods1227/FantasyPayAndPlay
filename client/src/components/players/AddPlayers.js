import React, { useState } from "react";
import PlayersList from "./PlayersList";

require("./add_player.css");
require("./filters.css");

const AddPlayers = () => {
  const [option, setOption] = useState({
    type: "projection",
    mode: "season",
    position: "all",
    dropDownOpen: false
  });

  return (
    <div className="players-panel">
      <div className="header-container">
        <h2>Available</h2>
        <input type="text" placeholder="Find player"/>
        <i className="fas fa-search"></i>
      </div>
      <div className="filters-container">
        <span>● TYPE</span>
        <div className="pill-selector">
          <span 
            className="option-item" 
            onClick={() => setOption(option => ({ ...option, type: "projection" }))}
          >Projection</span>
          <span 
            className="option-item"
            onClick={() => setOption(option => ({ ...option, type: "stats" }))}
          >Stats</span>
          <div 
            className="selected-pill-background" 
            style={{ width: `${option.type === "projection" ? '83.375px' : '56.1875px'}`,
              margin: `-26px 0 0 ${option.type === "projection" ? '0' : '84px'}`
            }}></div>
        </div>
        <span>● POSITION</span>
        <div className="pill-selector position">
          <span
            className="option-item"
            onClick={() => setOption(option => ({ ...option, position: "all" }))}
          >ALL</span>
          <span
            className="option-item"
            onClick={() => setOption(option => ({ ...option, position: "QB" }))}
          >QB</span>
          <span
            className="option-item"
            onClick={() => setOption(option => ({ ...option, position: "RB" }))}
          >RB</span>
          <span
            className="option-item"
            onClick={() => setOption(option => ({ ...option, position: "WR" }))}
          >WR</span>
          <span
            className="option-item"
            onClick={() => setOption(option => ({ ...option, position: "TE" }))}
          >TE</span>
          <div
            className="selected-pill-background"
            style={{
              width: `${option.position === "all" ? '48.4531px' : 
                option.position === "QB" ? '43.7188px' :
                option.position === "RB" ? '42.7188px' :
                option.position === "WR" ? '47.875px' :
                '40.5781px'
              }`,
              margin: `-26px 0 0 ${option.position === "all" ? '0' : 
                option.position === "QB" ? '51px' :
                option.position === "RB" ? '93px' :
                option.position === "WR" ? '136px' :
                '184px'
              }`,
            }}></div>
        </div>
        <span>● MODE</span>
        <div className="app-dropdown-container">
          <div 
            className="app-dropdown" 
            onMouseEnter={() => setOption(option => ({ ...option, dropDownOpen: true }))}
            onMouseLeave={() => setOption(option => ({ ...option, dropDownOpen: false }))}
          >
            <div className="selected-value">
              {option.mode.charAt(0).toUpperCase() + option.mode.substring(1)}
              <i className="fa fa-chevron-down"></i>
            </div>
            <div className="dropdown-items" style={option.dropDownOpen ? null : { display: "none" }}>
              <div className="app-dropdown-item selected">
                {option.mode.charAt(0).toUpperCase() + option.mode.substring(1)}
              </div>
              <div 
                className="app-dropdown-item"
                onClick={() => setOption(option => ({ ...option, mode: option.mode === "season" ? "week" : "season"}))}
              >{option.mode === "season" ? "Week" : "Season"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayersList type={option.type} mode={option.mode} position={option.position} />
    </div>
  )
};

export default AddPlayers;