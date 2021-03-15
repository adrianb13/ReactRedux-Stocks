import React from "react";
import { withRouter } from "react-router-dom";
import "./stockMatchChart.css";

//props.bestMatches - list of matches based on user query

const StockMatchChart = (props) => {
  return (
    <div>
      
      <table className="smcTable">
        <thead>
          <tr>
            <th>Symbol</th>
            <th style={{minWidth: "250px"}}>Name</th>
            <th>Primary Exchange</th>
            <th>Region</th>
            <th>Currency</th>
            
          </tr>
        </thead>

        <tbody>
          {props.bestMatches.map(match => (
            <tr key={match.ticker} onClick={() => props.quoteSymbol(match)}>
              <td className="smcLink">{match.ticker}</td>
              <td className="smcLink">{match.name}</td>
              <td>{match.primaryExch}</td>
              <td>{match.locale}</td>
              <td>{match.currency}</td>
              {/* <td>
                <button className="smcSearch" onClick={() => props.quoteSymbol(match)}>Select</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  )
}

export default withRouter((StockMatchChart));