import React from 'react';

const TeamIndex = ({ teams }) => {
  return (
    <div>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <h2>{team.name}</h2>
            {team.players.map(player => (
              <div>
                {console.log(player)}
                {player.position}
                {player.name}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamIndex;