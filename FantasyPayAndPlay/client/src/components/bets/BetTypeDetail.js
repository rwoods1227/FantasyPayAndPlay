import React from "react";
import { Link } from "react-router-dom";

const BetTypeDetail = ({bets, selected}) => {
  return (
    <div className={selected ? "bet-type" : "hidden"}>
      {bets.map(bet => (
        <div key={`bet-details-${bet._id}`} className="bet-details">
          <h2>{bet.details}</h2>
          <span>{bet.line}</span>
          <div className="bet-placement">
            <h3>Place a bet</h3>
            <form className="bet-placement-form">
              <input type="number" placeholder="Enter bet"/>
              <button>PLACE BET</button>
            </form>
          </div>
        </div>
      ))}
      <div className="bet-detail-back-button">
        <Link to="/bets"><span><i className="fas fa-undo"></i> back to matches</span></Link>
      </div>
    </div>  
  )
}

export default BetTypeDetail;
