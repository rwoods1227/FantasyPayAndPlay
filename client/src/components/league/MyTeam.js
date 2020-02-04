import React from 'react';
require("./team_index.css");

const MyTeam = ({teams}) => {
  return (
    <div className="team-index-container">
      <ul id ="no-scroll" className="team-index-ul">
        {teams.map(team => {
          { if (team.user === localStorage.getItem("currentUserId")){
            return(
            <li key={team._id}>
              <h2 className="team-index-name">{team.name}</h2>
              {team.players.map(player => (
                <div className="player-entry">
                  <div className={`${player.position}`}>
                    {player.position}
                  </div>
                  <div className="justify-space-between">
                    <div className="team-player-name">{player.name}</div>
                    <div className="team-player-fantasyPoints">{`Total Fantasy Points: ${player.seasonFantasyPoints}`}</div>
                  </div>
                </div>
              ))}
            </li>
            )}}
        })}
      </ul>
    </div>
  );
}

export default MyTeam;