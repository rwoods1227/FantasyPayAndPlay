import React from "react"
import { Link } from "react-router-dom"
require("./credit.css")
// under transtion to work with change main
const Credit = ({changeMain}) => {

  return (
    <div className="main-page main-flex-css">
      <div>
        <h1 className="credits-h1">Credits</h1>
      </div>
      <div className="main-credit-flex">
        {/* <div className="credit-card">
          <Link className="cc-name credits-back-button" to="/app">Back to Bets</Link>
        </div>   */}
        <div className="credit-card">
          <h2 className="cc-name">Ryan Woods</h2>
          <div className="credit-card-links">
            <li className="cc-link"><a target="_blank" href="https://www.ryanwoodsdev.com/">Portfolio</a></li>
            <li className="cc-link"><a target="_blank" href="https://github.com/rwoods1227">Github</a></li>
            <li className="cc-link"><a target="_blank" href="https://www.linkedin.com/in/ryan-woods-530679b4/">LinkedIn</a></li>
          </div>      
        </div>
        <div className="credit-card">
          <h2 className="cc-name">Patrick Mondala</h2>
          <div className="credit-card-links">
            <li className="cc-link"><a target="_blank" href="https://patrick-mondala.github.io/portfolio-site/#">Portfolio</a></li>
            <li className="cc-link"><a target="_blank" href="https://github.com/Patrick-Mondala">Github</a></li>
            <li className="cc-link"><a target="_blank" href="https://www.linkedin.com/in/patrick-mondala/">LinkedIn</a></li>
          </div>         
        </div>
        <div className="credit-card">
          <h2 className="cc-name">Zach Williams</h2> 
          <div className="credit-card-links">
            <li className="cc-link"><a target="_blank" href="http://swezachary.com/">Portfolio</a></li>
            <li className="cc-link"><a target="_blank" href="https://github.com/ZacharyCWilliams">Github</a></li>
            <li className="cc-link"><a target="_blank" href="https://www.linkedin.com/in/zachary-currell-williams/">LinkedIn</a></li>
          </div>        
        </div>
      </div>
    </div>
  );
}
  


export default Credit;