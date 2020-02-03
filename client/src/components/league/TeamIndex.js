import React from 'react';

require("./team_index.css");

const TeamIndex = ({ teams }) => {
  return (
    <div className="team-index-container">
      <ul className="team-index-ul">
        {teams.map(team => (
          <li key={team._id}>
            <h2 className="team-index-name">{team.name}</h2>
            {team.players.map(player => (
              <div className="player-entry">
                <div className={`${player.position}`}>
                  {player.position}
                </div>
                <div className="team-player-name">{player.name}</div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamIndex;