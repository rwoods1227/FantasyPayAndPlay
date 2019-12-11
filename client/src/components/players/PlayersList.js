import React from "react";
import Queries from "../../graphql/queries";
import { Query } from 'react-apollo';
const { FETCH_PLAYERS } = Queries;

require("./players_list.css");

const getDisplayType = (type, mode) => {
  switch (type) {
    case "projection":
      return mode === "season" ? "projectedSeason" : "projectedWeek";
    case "stats":
      return mode === "season" ? "statsSeason" : "statsWeek";
    default:
      break;
  }
}

const PlayersList = ({ type, mode, position }) => {
  return (
    <div className="players-list-container">
      <Query query={FETCH_PLAYERS}>{({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        const displayType = getDisplayType(type, mode);
        const playersToDisplay = position === "all" ? 
          data.players : data.players.filter(player => player.position === position);
        return (
          <div className="player-table-container">
            <table className="player-table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>PROJ</th>
                  <th>PTS<span>FANTASY</span></th>
                  <th>ADP</th>
                  <th>RUSH</th>
                  <th>YDS<span>RUSHING</span></th>
                  <th>TD</th>
                  <th>REC</th>
                  <th>TAR</th>
                  <th>YDS<span>RECEIVING</span></th>
                  <th>TD</th>
                  <th>CMP</th>
                  <th>ATT</th>
                  <th>YDS<span>PASSING</span></th>
                  <th>TD</th>
                </tr>
              </thead>
              <tbody>
              {playersToDisplay.map(player => (
                <tr key={`player-${player._id}`}>
                  <td className="player-name">{player.name}</td>
                  <td className="player-position">{player.position} - {player.team}</td>
                  <td><span className="player-add-button"><i className="fas fa-plus"></i> ADD</span></td>
                  <td>
                    {displayType === "projectedSeason" || displayType === "statsSeason" ? 
                      player.projSFantasyPoints || "-" :
                    displayType === "projectedWeek" || displayType === "statsWeek" ? 
                      player.projWFantasyPoints || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" || displayType === "statsSeason" ? 
                      player.seasonFantasyPoints || "-" :
                    displayType === "projectedWeek" || displayType === "statsWeek" ? 
                      player.weeklyFantasyPoints || "-" : 
                    "-"}
                  </td>
                  <td>
                    {player.averageDraftPosition || "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSRushingAttempts || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWRushingAttempts || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonRushingAttempts || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyRushingAttempts || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSRushingYards || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWRushingYards || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonRushingYards || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyRushingYards || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSRushingTouchdowns || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWRushingTouchdowns || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonRushingTouchdowns || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyRushingTouchdowns || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSReceptions || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWReceptions || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonReceptions  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyReceptions || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSReceivingTargets || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWReceivingTargets || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonReceivingTargets  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyReceivingTargets || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSReceivingYards || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWReceivingYards || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonReceivingYards  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyReceivingYards || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSReceivingTouchdowns || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWReceivingTouchdowns || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonReceivingTouchdowns  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyReceivingTouchdowns || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSPassingCompletions || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWPassingCompletions || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonPassingCompletions  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyPassingCompletions || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSPassingAttempts || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWPassingAttempts || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonPassingAttempts  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyPassingAttempts || "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSPassingYards || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWPassingYards || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonPassingYards  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyPassingYards|| "-" :
                    "-"}
                  </td>
                  <td>
                    {displayType === "projectedSeason" ? 
                      player.projSPassingTouchdowns || "-" :
                    displayType === "projectedWeek" ? 
                      player.projWPassingTouchdowns || "-" : 
                    displayType === "statsSeason" ? 
                      player.seasonPassingTouchdowns  || "-" :
                    displayType === "statsWeek" ?
                      player.weeklyPassingTouchdowns|| "-" :
                    "-"}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )
      }}
      </Query>
    </div>
  )
}

export default PlayersList;