import React, { useState } from "react";
import BetTypeDetail from "./BetTypeDetail";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_BET, FETCH_BET_TYPES } = Queries;

require("./bet_detail.css");

const BetDetail = ({ matchId, changeMain }) => {
  const [tab, setTab] = useState({
    betType: "Moneyline"
  });

  const handletabChange = betType => event => {
    event.persist();
    setTab(tab => ({ ...tab, betType }));
  };

  return (
    <Query query={FETCH_BET} variables={{ _id: matchId }}>
      {({ loading, error, data }) => {
        if (loading) return <p style={{ background: "transparent" }}>Loading...</p>;
        if (error) return <p style={{ background: "transparent" }}>Error</p>;

        let description = data.bet.description;
        return <Query query={FETCH_BET_TYPES} variables={{ description }}>
          {({loading, error, data}) => {
            if (loading) return <p style={{background: "transparent"}}>Loading...</p>;
            if (error) return <p style={{background: "transparent"}}>Error</p>;

            const tabs = ["Moneyline", "Spread", "Over/Under"];
            return (
              <div className="bet-detail-container">
                <h1>{description}</h1>
                <span>Bet on this match</span>
                <div className="bets-tabs-container">
                  {tabs.map((currentTab, index) => (
                    <div
                      key={currentTab + index}
                      className={tab.betType === currentTab ? "tab selected" : "tab"}
                      onClick={handletabChange(currentTab)}
                      style={{zIndex: tabs.length - index}}
                    >
                      <span>{currentTab}</span>
                    </div>
                    )
                  )}
                </div>
                {tabs.map((currentTab, index) => (
                  <BetTypeDetail 
                    key={`bet-type-${currentTab}-${index}`} 
                    bets={data.betTypes.filter(bet => bet.details.startsWith(currentTab))} 
                    selected={tab.betType === currentTab}
                    changeMain={changeMain}
                  />
                ))}
              </div>
            )
          }}
        </Query>
      }}
    </Query>
  )
};

export default BetDetail;