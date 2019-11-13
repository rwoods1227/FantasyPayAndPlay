import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

require("./nav.css");

const Nav = props => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  const history = useHistory();

  const logoutButton = (
    <button
      onClick={e => {
        e.preventDefault();
        localStorage.removeItem("auth-token");
        client.writeData({ data: { isLoggedIn: false } });
        history.push("/");
      }}
    >
    LOGOUT
    </button>
  );

  return data.isLoggedIn ? (
    <nav className="navbar">
      <h1 className="nav-header"><Link to="/">FantasyPay&Play</Link></h1>
      <div className="navbar-links">
        {logoutButton}
        <Link to="/bets" id="splash-nav-open-link">OPEN</Link>
      </div>
    </nav>
  ) : (
      <nav className="navbar">
        <h1 className="nav-header"><Link to="/">FantasyPay&Play</Link></h1>
        <div className="auth" id="signed-out">
          <Link to="/login" id="login-link">Login</Link>
          <Link to="/register" id="register-link">SIGN UP</Link>
        </div>
      </nav>
    )
};

export default Nav;