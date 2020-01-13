# FantasyPay&Play(WIP)
# [Live Demo](https://fantasypayandplay.herokuapp.com/#/)


## Technologies
 * Backend: MongoDB, Express, Express / GraphQL, and Node.js (MERN)
 * Frontend: JavaScript, React, Redux, Apollo / GraphQL
 * FantasyAPI/BettingAPI(https://sportsdata.io/developers/api-documentation/nfl#/fantasy)

## Background and Overview

FantasyPay&Play is a fantasy football and sports betting website. It incorporates two major football fandom passtimes through a football fantasy league clone and a simple money-line sports betting client

## Features and Technical Challenges

### State based content display

![FP&P Main content](./screenshots/main.png)

![FP&P Sidebar](./screenshots/sidebar.png)

The main content is displayed using the side bar's state of the mainComponent
```
  const [main, setMain] = useState({
    mainComponent: BetsIndex, //default selected component
    props: null
  });

  const changeMain = (mainComponent, props) => (
    setMain(main => ({ ...main, mainComponent, props }))
  );
```
This is possible by sending the changeMain function down as a prop to the sidebar and their items, and the component currently displayed as seen from the main page component
```
  return (
    <div className="main-page">
      <div className="sidebar-container">
        <Nav onAppPage={true} />
        <SideBar changeMain={changeMain} /> //each sidebar item will use changeMain when clicked
      </div>
      <div className="main-content">
        <main.mainComponent {...main.props} changeMain={changeMain} /> //the component displayed is taken from main state
      </div>
      <div className="right-sidebar"></div>
    </div>
  );
```

## Upcoming Additions
- [ ] League Chat(Transaction Log)
- [ ] Player News


