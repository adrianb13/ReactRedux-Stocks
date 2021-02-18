import React from "react";
import { withRouter } from "react-router-dom";
//import { connect } from "react-redux";
import "./stocks.css";

class Stocks extends React.Component {
  state = {

  }

  render () {
    return (
      <div className="backBlack">
        <div className="sHeaderBox">
          <div className="sHeader">TICKER ME THIS</div>
        </div>
        <div className="sDBArea">
          <div className="sDotBorder"></div>
          <div className="sHeaderText"><span className="sRed">DON'T DELAY,</span> INVEST IN YOUR FUTURE NOW! <span style={{marginLeft: "30px"}}>UR {"\u25B2"} 100%</span></div>
          <div className="sDotBorder"></div>
        </div>
        <br />
        <div className="sSearchBox">
          <div className="sSearch">Search</div>
          <input className="sSearchInput" type="text" placeholder="Name or Ticker Symbol"></input>
        </div>

        <div className="sTableArea">
          <table className="sTable">
            <thead>
              <tr>
                <th>Symbol</th>
                <th style={{width: "250px"}}>Name</th>
                <th>Current</th>
                <th>+/- ($)</th>
                <th>% Change</th>
                <th>Open</th>
                <th>Today's High</th>
                <th>Today's Low</th>
                <th>52-Wk High</th>
                <th>52-Wk Low</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XYZ</td>
                <td>XYZ Inc.</td>
                <td>$5.00</td>
                <td>+1.00</td>
                <td>+25.0%</td>
                <td>$4.00</td>
                <td>$5.25</td>
                <td>$3.90</td>
                <td>$5.25</td>
                <td>$2.00</td>
                <td>10M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withRouter((Stocks));