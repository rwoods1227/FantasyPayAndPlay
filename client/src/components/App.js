import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./session/Login";
import Register from "./session/Register";
import Splash from "./splash/Splash";
import AddPlayerPage from "./players/AddPlayers"
import UserProfile from "./user/UserProfile";
import UserIndex from "./user/UserIndex";
import Credit from "./main/Credit"
import Main from "./main/Main";

import AuthRoute from "../util/route_util";
require("./reset.css");

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={Login} routeType="auth" />
      <AuthRoute path="/register/:email" component={Register} routeType="auth" />
      <AuthRoute path="/register" component={Register} routeType="auth" />
      <Route exact path="/players" component={AddPlayerPage} routeType="protected" />
      {/* <AuthRoute exact path="/bets" component={BetsList} routeType="protected" />
      <AuthRoute path="/bets/:id" component={BetDetail} routeType="protected" /> */}
      <AuthRoute path="/users/:id" component={UserProfile} routeType="protected" />
      {/* <AuthRoute exact path="/users" component={UserIndex} routeType="protected" /> */}
      <AuthRoute exact path="/app" component={Main} routeType="protected" />
      <Route exact path="/credits" component={Credit} />
      <Route path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;
