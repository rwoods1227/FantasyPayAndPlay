# FantasyPay&Play(WIP)
# [Live Demo](https://fantasypayandplay.herokuapp.com/#/)


## Technologies
 * Backend: MongoDB, Express, Express / GraphQL, and Node.js (MERN)
 * Frontend: JavaScript, React, Redux, Apollo / GraphQL
 * FantasyAPI/BettingAPI(https://sportsdata.io/developers/api-documentation/nfl#/fantasy)

## Background and Overview

FantasyPay&Play is a fantasy football and sports betting website. It incorporates two major football fandom passtimes through a football fantasy league clone and a simple money-line sports betting client

## Features and Technical Challenges

### Nfl Players
```javascript
//mutations.js
createAllPlayers: {
      type: new GraphQLList(PlayerType),
      resolve() {
        const promiseArr = [];
        const allPlayers = {};

        promiseArr.push(
          axios(seasonStats).then(res => {
            let seasonStatsArr = res.data;
            sortJsonArray(seasonStatsArr, "PlayerID");
            seasonStatsArr.forEach(player => {

 //after assembling all data from 4 ApiCalls
return Promise.all(promiseArr).then(() => {
          let promiseArr = [];
          Object.values(allPlayers).forEach(player => {
            promiseArr.push(
              new Player({
                name: player.name,
                team: player.team,
                position: player.position,
                IsGameOver: player.isGameOver,

                weeklyPassingAttempts: player.weeklyPassingAttempts,
                weeklyPassingCompletions: player.weeklyPassingCompletions,
                weeklyPassingYards: player.weeklyPassingYards,
                weeklyPassingTouchdowns: player.weeklyPassingTouchdowns,
                weeklyPassingInterceptions: player.weeklyPassingInterceptions,
                weeklyRushingAttempts: player.weeklyRushingAttempts,
                weeklyRushingYards: player.weeklyRushingYards,
                weeklyRushingTouchdowns: player.weeklyRushingTouchdowns,
                weeklyFumblesLost: player.weeklyFumblesLost,
                weeklyReceivingTargets: player.weeklyReceivingTargets,
                weeklyReceptions: player.weeklyReceptions,
                weeklyReceivingYards: player.weeklyReceivingYards,
                weeklyReceivingTouchdowns: player.weeklyReceivingTouchdowns,
                weeklyTwoPointConversionPasses:
                  player.weeklyTwoPointConversionPasses,
                weeklyTwoPointConversionRuns:
                  player.weeklyTwoPointConversionRuns,
                weeklyTwoPointConversionReceptions:
                  player.weeklyTwoPointConversionReceptions,
                weeklyFantasyPoints: player.weeklyFantasyPoints,
                weeklyFantasyPointsPPR: player.weeklyFantasyPointsPPR,
                weeklyActive: player.weeklyActive,

                projWPassingAttempts: player.projWPassingAttempts,
		etc….
```




## Upcoming Additions
- [ ] League Chat(Transaction Log)
- [ ] Player News


