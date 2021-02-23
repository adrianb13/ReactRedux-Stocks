import React from "react";
import { withRouter } from "react-router-dom";
import "./stockQuoteChart.css";

const StockQuoteChart = (props) => {
  return (
    <div>
      <table className="sqcTable">
        <thead>
          <tr>
            <th>Symbol</th>
            <th style={{width: "250px"}}>Name</th>
            <th>Current*</th>
            <th>+/- ($)</th>
            <th>% Change</th>
            <th>Open</th>
            <th>Today's High</th>
            <th>Today's Low</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.ticker}</td>
            <td>{props.tickerName}</td>
            <td>${props.currentStockQuote["05. price"].slice(0, -2)}</td>
            <td>{props.currentStockQuote["09. change"].slice(0, -2)}</td>
            <td>{props.currentStockQuote["10. change percent"].slice(0, -2)}</td>
            <td>${props.currentStockQuote["02. open"].slice(0, -2)}</td>
            <td>${props.currentStockQuote["03. high"].slice(0, -2)}</td>
            <td>${props.currentStockQuote["04. low"].slice(0, -2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="sqcPriceDisclaimer">
        <div>* Current pricing does not include After-Hours price changes when Market is closed.</div>
        <div>** Current pricing is delayed 15 minutes during Market hours.</div>
      </div>
    </div>
  )
}

export default withRouter((StockQuoteChart));