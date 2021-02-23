import React from "react";
import { withRouter } from "react-router-dom";
//import { connect } from "react-redux";
import API from "../../utils/API";
import "./stocks.css";


class Stocks extends React.Component {
  state = {
    query: null,
    bestMatches: null,
    ticker: null,
    tickerName: null,
    currentStockInfo: null,
    currentStockQuote: null,
    searchBox: false,
    stockAvailable: false
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  enterSubmit = (event) => {
    if(event.key === "Enter"){
      this.findSymbol(event);
    }
  }

  findSymbol = (event) => {
    event.preventDefault();
    this.setState({
      stockAvailable: false,
      query: ""
    })
    
    let search = this.state.query
    API.findStockSymbol(search)
      .then(res => {
        console.log(res.data.tickers)
        let results = res.data.tickers;
        
        if(results.length > 1){
          let bestMatches = results.filter(stock => stock.currency === "USD")
          console.log(bestMatches)
          
          if(bestMatches.length === 1){
            let current = bestMatches[0];
            this.quoteSymbol(current);
          } else {
            this.setState({
              bestMatches: bestMatches
            })
          }

        } else if (results.length === 1) {
          let current = results[0]
          this.quoteSymbol(current);
        } else {
          console.log("no matches")
        }
        
/*         let tickerSymbol = res.data.result[0].displaySymbol;
        let currentStockInfo = res.data.result[0]
        if(tickerSymbol){
          this.setState({
            currentStockInfo: currentStockInfo
          }) */
/*           API.quoteSymbol(tickerSymbol)
            .then(res => {
              console.log(res.data)
              let change = res.data.c - res.data.pc;
              let percent = change / res.data.pc * 100;
              this.setState({
                currentStockQuote: res.data,
                currentStockChange: change,
                currentStockPercent: percent,
                stockAvailable: true,
              })
            }) 
        } */
      })
      .catch(err => console.log(err))
  }

  quoteSymbol = (symbol) => {
    let currentSymbol = symbol.ticker;
    let currentName = symbol.name;
    this.setState({
      ticker: currentSymbol,
      tickerName: currentName
    })

    API.quoteSymbol(currentSymbol)
      .then(res => {
        console.log(res.data)
        let quote = res.data["Global Quote"]
        this.setState({
          currentStockQuote: quote,
          stockAvailable: true
        })

        //Finnhub Quote - Must update UI states below
        /* let change = res.data.c - res.data.pc;
        let percent = change / res.data.pc * 100;
        change = change.toFixed(2);
        percent = percent.toFixed(2);
        this.setState({
          currentStockQuote: res.data,
          currentStockChange: change,
          currentStockPercent: percent,
          stockAvailable: true,
        }) */
      })
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
        <div className="sSearchBox" onChange={this.handleInputChange}>
          <button className="sSearch" type="submit" onClick={this.findSymbol}>Search</button>
          <input className="sSearchInput" type="text" name="query" id="query" onKeyDown={this.enterSubmit} placeholder="Name or Ticker Symbol"></input>
        </div>

        {this.state.searchBox ? (
          <div>
            {this.state.bestMatches.map(match => (
              <table className="sSearchTable">
                <thead>

                </thead>
              </table>
            ))}
          </div>
        ) : (null)}

        {this.state.stockAvailable ? (
          <div className="sTableArea">
            <table className="sTable">
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
                  <td>{this.state.ticker}</td>
                  <td>{this.state.tickerName}</td>
                  <td>${this.state.currentStockQuote["05. price"].slice(0, -2)}</td>
                  <td>{this.state.currentStockQuote["09. change"].slice(0, -2)}</td>
                  <td>{this.state.currentStockQuote["10. change percent"].slice(0, -2)}</td>
                  <td>${this.state.currentStockQuote["02. open"].slice(0, -2)}</td>
                  <td>${this.state.currentStockQuote["03. high"].slice(0, -2)}</td>
                  <td>${this.state.currentStockQuote["04. low"].slice(0, -2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="sPriceDisclaimer">* Current pricing does not include After-Hours price changes when Market is closed.</div>
          </div>
        ) : (null)}

        <div></div>
      </div>
    )
  }
}

export default withRouter((Stocks));