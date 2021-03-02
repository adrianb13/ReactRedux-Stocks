import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
//import API from "../../utils/API";
import "./stocks.css";

import StockMatchChart from "../StockMatchChart/index";
import StockQuoteChart from "../StockQuoteChart/index";
import CompanyInfo from "../CompanyInfo";

class Stocks extends React.Component {
  state = {
    query: null,
    bestMatches: null,
    ticker: null,
    tickerName: null,
    currentStockQuote: null,
    currentStockInfo: null,
    searchBox: false,
    searchIntro: true,
    stockAvailable: false
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  enterSubmit = (event) => {
    if(event.key === "Enter"){
      this.findSymbol(event);
    }
  };

  findSymbol = (event) => {
    event.preventDefault();
    let search = this.state.query;
    this.setState({
      stockAvailable: false,
      searchIntro: false
    });
    
    this.props.actions.findStockSymbol(search)
      .then(res => {
        let results = this.props.matches.tickers;
        
        if(results.length > 1){
          let bestMatches = results.filter(stock => stock.currency === "USD")
          
          if(bestMatches.length === 1){
            let current = bestMatches[0];
            this.quoteSymbol(current);
          } else {
            this.setState({
              bestMatches: bestMatches,
              searchBox: true
            })
          }

        } else if (results.length === 1) {
          let current = results[0]
          this.quoteSymbol(current);
        } else {
          // Add something here for no matches
          console.log("no matches")
        };
      })
      .catch(err => console.log(err))
      
  };

  quoteSymbol = (symbol) => {
    let currentSymbol = symbol.ticker;
    let currentName = symbol.name;
    this.setState({
      ticker: currentSymbol,
      tickerName: currentName,
      searchBox: false
    });

    this.props.actions.quoteSymbol(currentSymbol)
      .then(res => {
        console.log(this.props.quote)
        console.log(currentSymbol);
        let quote = this.props.quote["Global Quote"]
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

      this.props.actions.companyInfo(currentSymbol)
        .then(res => {
          let info = this.props.stockInfo;
          this.setState({
            currentStockInfo: info
          })
        })
  };

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
            <StockMatchChart 
              bestMatches={this.state.bestMatches}
              quoteSymbol={this.quoteSymbol}
            />
          </div>
        ) : (
          <div>
            {this.state.searchIntro ? (
              <div>
                <div className="sSearchHeaderBox">
                  <div className="sSearchHeader">Let's Find Your Next Investment!</div>
                </div>
                <div className="disclaimer"> *** This site does not provide financial advice. It is here to provide educational information in your process of doing your due diligence.***</div>
              </div>
            ) : (null)}
          </div>
        )}

        {this.state.stockAvailable ? (
          <div>
            <div className="sTableArea">
              <StockQuoteChart 
                ticker={this.state.ticker}
                tickerName={this.state.tickerName}
                currentStockQuote={this.state.currentStockQuote}
              />
            </div>
            <div>
              <CompanyInfo 
                companyInfo={this.state.currentStockInfo}
              />
            </div>
          </div>
        ) : (null)}
        
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return { 
    matches: state.matches,
    quote: state.quote,
    stockInfo: state.stockInfo
  }
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stocks));