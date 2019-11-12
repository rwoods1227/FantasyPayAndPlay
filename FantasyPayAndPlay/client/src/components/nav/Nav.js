import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from 'react-router-dom';

import Queries from "../../graphql/queries";
const { IS_LOGGED_IN } = Queries;

require("./nav.css");

const Nav = props => {
  const { data } = useQuery(IS_LOGGED_IN);

  // const logoutButton = (
  //   <button
  //     onClick={e => {
  //       e.preventDefault();
  //       localStorage.removeItem("auth-token");
  //       client.writeData({ data: { isLoggedIn: false } });
  //       history.push("/");
  //     }}
  //   >
  //   Logout
  //   </button>
  // );

  return data.isLoggedIn ? (
    <nav className="navbar">
      <h1 className="nav-header"><Link to="/">FantasyPay&Play</Link></h1>
      <Link to="/bets" id="splash-nav-open-link">OPEN</Link>
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