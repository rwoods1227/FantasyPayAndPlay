import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from 'react-router-dom';

import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  const { data, client } = useQuery(IS_LOGGED_IN);
  const history = useHistory();

  return data.isLoggedIn ? (
    <React.Fragment>
      <Link to="/">Home</Link>
      <button
        onClick={e => {
          e.preventDefault();
          localStorage.removeItem("auth-token");
          client.writeData({ data: { isLoggedIn: false } });
          history.push("/");
        }}
      >
        Logout
      </button>
    </React.Fragment>
  ) : (
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </nav>
    )
};

export default Nav;