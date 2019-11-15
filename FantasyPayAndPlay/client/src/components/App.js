import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import BetsList from "./bets/BetsIndex";
import BetDetail from "./bets/BetDetail";
import Splash from "./splash/Splash";
import AddPlayerPage from "./players/AddPlayers"

import AuthRoute from "../util/route_util";
require("./reset.css");

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <AuthRoute path="/register/:email" component={Register} routeType="auth" />
      <AuthRoute path="/register" component={Register} routeType="auth" />
      <Route exact path="/players" component={AddPlayerPage} routeType="protected" />
      <AuthRoute exact path="/bets" component={BetsList} routeType="protected" />
      <AuthRoute path="/bets/:id" component={BetDetail} routeType="protected" />
      <Route path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;
