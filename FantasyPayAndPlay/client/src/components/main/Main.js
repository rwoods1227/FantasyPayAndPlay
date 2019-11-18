import React, { useState } from 'react';
import SideBar from "../sidebar/sidebar";
import Nav from "../nav/Nav";

import BetsIndex from "../bets/BetsIndex";

require("./main.css");

const Main = () => {
  const [main, setMain] = useState({
    mainComponent: BetsIndex,
    props: null
  });

  const changeMain = (mainComponent, props) => (
    setMain(main => ({ ...main, mainComponent, props }))
  );

  return (
    <div className="main-page">
      <div className="sidebar-container">
        <Nav onAppPage={true} />
        <SideBar />
      </div>
      <div className="main-content">
        <main.mainComponent {...main.props} changeMain={changeMain} />
      </div>
    </div>
  );
};

export default Main;