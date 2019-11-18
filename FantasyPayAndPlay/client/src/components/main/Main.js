import React, { useState } from 'react';
import SideBar from "../sidebar/sidebar";

import BetsIndex from "../bets/BetsIndex";
import BetDetail from "../bets/BetDetail";

const Main = () => {
  const [main, setMain] = useState({
    mainComponent: BetsIndex,
    props: null
  });

  const changeMain = (mainComponent, props) => (
    setMain(main => ({ ...main, mainComponent, props }))
  );

  return (
    <div className="main-page-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="main-content">
        <main.mainComponent {...main.props} changeMain={changeMain} />
      </div>
    </div>
  );
};

export default Main;