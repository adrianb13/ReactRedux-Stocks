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
    stockAvailable: false,
    companyInfoAvailable: false
  }

  componentDidMount = () => {
    this.date()
  }
  
  date = () => {
    let date = new Date();
    let dateDay = date.getDay();
    let date1 = Math.round(Date.now()/1000);

    //UTC Date (at midnight) in UNIX 
    let UTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    //let UTCString = new Date(UTC).toString(); 
    let UTCDay = new Date(UTC).getUTCDay()
    UTC = Math.round(UTC/1000);

    //Convet current UNIX date to string Example
    /* let date2 = Date.now()
    console.log(date2)
    console.log(new Date(date2).toString()) */
    
    this.openClose(date, dateDay, date1, UTC, UTCDay);
  }

  openClose = (date, dateDay, date1, UTC, UTCDay) => {
    if(UTCDay === 0){
      console.log("Sun", UTCDay); 
      //Need Friday Chart
      let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-2)/1000 + 43200;
      let marketClose = marketOpen + 46800;
      this.setState({
        marketOpen: marketOpen,
        marketClose: marketClose
      })
      console.log("Local:" + dateDay, "UTC:" + UTCDay,"Open:" + marketOpen, "Close:" + marketClose)
    
    } else if(UTCDay === 6){
      console.log("Sat", UTCDay)
      //Need Friday Chart
      let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-1)/1000 + 43200;
      let marketClose = marketOpen + 46800;
      this.setState({
        marketOpen: marketOpen,
        marketClose: marketClose
      })
      console.log("Local:" + dateDay, "UTC:" + UTCDay,"Open:" + marketOpen, "Close:" + marketClose)
      
    } else if (UTCDay === 1 || UTCDay === 2 || UTCDay === 3 || UTCDay === 4 || UTCDay === 5){
      console.log("Weekday")
      //Monday before Market Open - Need Friday Chart
      if(UTCDay === 1 && date1 < (UTC + 43200) ){
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-3)/1000 + 43200;
        let marketClose = marketOpen + 46800;
        this.setState({
          marketOpen: marketOpen,
          marketClose: marketClose
        })
        console.log("Local:" + dateDay, "UTC:" + UTCDay, "Open:" + marketOpen, "Close:" + marketClose)
      
      //Current Weekday in AH or Pre-Market
      } else if(UTCDay >= dateDay && date1 < (UTC + 43200)) {
        console.log("Market AH/PM")
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-1)/1000 + 43200;
        let marketClose = marketOpen + 46800;
        this.setState({
          marketOpen: marketOpen,
          marketClose: marketClose
        })
        console.log("Local:" + dateDay, "UTC:" + UTCDay, "Open:" + marketOpen, "Close:" + marketClose, date1, UTC + 43200)
      
      //Market is Open
      } else {
        console.log("Market Open")
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())/1000 + 43200;
        let marketClose = marketOpen + 46800;
        this.setState({
          marketOpen: marketOpen,
          marketClose: marketClose
        })
        console.log("Local:" + dateDay, "UTC:" + UTCDay, "Open:" + marketOpen, "Close:" + marketClose)
      }
    }
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
      companyInfoAvailable: false,
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
        //console.log(this.props.quote)
        console.log(currentSymbol);
        //Alpha Quote - Must update UI states in StockQuoteChart
        /* let quote = this.props.quote["Global Quote"]
        this.setState({
          currentStockQuote: quote,
          stockAvailable: true
        }) */

        //Finnhub Quote - Must update UI states in StockQuoteChart
        let change = this.props.quote.c - this.props.quote.pc;
        let percent = change / this.props.quote.pc * 100;
        change = change.toFixed(2);
        percent = percent.toFixed(2);
        this.setState({
          currentStockQuote: this.props.quote,
          currentStockChange: change,
          currentStockPercent: percent,
          stockAvailable: true,
        }) 
      })

      this.props.actions.companyInfo(currentSymbol)
        .then(res => {
          let info = this.props.stockInfo;
          this.setState({
            currentStockInfo: info,
            companyInfoAvailable: true
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
          <div className="sHeaderText">
            <div><span className="sRed">DON'T DELAY,</span> INVEST IN YOUR FUTURE NOW!</div>
            <div><span style={{marginLeft: "30px"}}>UR {"\u25B2"} 100%</span></div>
          </div>
          <div className="sDotBorder"></div>
        </div>
        <br />
        <div className="sSearchBox" onChange={this.handleInputChange}>
          <button className="sSearch" type="submit" onClick={this.findSymbol}>Search</button>
          <input className="sSearchInput" type="text" name="query" id="query" onKeyDown={this.enterSubmit} placeholder="Name or Ticker Symbol"></input>
        </div>

        {this.state.searchBox ? (
          <div>
            <div className="sMatchText">WHICH ONE DO YOU WANT TO LEARN MORE ABOUT?</div>
            <div className="sTableHeader">BEST MATCHES</div>
            <div className="sTableArea">
              <StockMatchChart 
                bestMatches={this.state.bestMatches}
                quoteSymbol={this.quoteSymbol}
              />
            </div>
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
                currentStockChange={this.state.currentStockChange}
                currentStockPercent={this.state.currentStockPercent}
              />
            </div>
            
          </div>
        ) : (null)}

        {this.state.companyInfoAvailable ? (
          <div>
            <CompanyInfo 
              companyInfo={this.state.currentStockInfo}
            />
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