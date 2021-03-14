import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./searchBar.css";
import "../StockPage/stockPage.css";

import StockMatchChart from "../StockMatchChart/index";

/* Props
searchIntro = boolean - whether to show Ticker Image and Intro Header from Home page.
checkSubmit = boolean - track whether submit button was clicked
*/

class SearchBar extends React.Component{
  state = {
    searchBox: false,
    searchIntro: this.props.searchIntro,
    checkSubmit: this.props.checkSubmit,
    stockAvailable: false,
    companyInfoAvailable: false
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
    
    /* Allows for check if new search was submitted */
    this.props.checkSubmit(true);
    
    let search = this.state.query;
    this.setState({
      stockAvailable: false,
      companyInfoAvailable: false,
      searchIntro: false
    });
    
    this.props.actions.findStockSymbol(search)
      .then(res => {
        let results = this.props.matches.tickers;
        console.log(this.props.matches.tickers);
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
          let current = results[0];
          this.quoteSymbol(current);
        } else {
          // Add something here for no matches
          console.log("no matches")
        };
      })
      .catch(err => console.log(err))
      
  };

  quoteSymbol = (symbol) => {

    this.props.checkSubmit(false);

    let currentSymbol = symbol.ticker;
    let currentName = symbol.name;
    this.setState({
      ticker: currentSymbol,
      tickerName: currentName,
      searchBox: false
    });
    //console.log(symbol)
    this.props.actions.stockName(symbol)
    this.props.actions.quoteSymbol(currentSymbol)
    this.props.actions.companyInfo(currentSymbol)
      .then(res => {
        let quote = this.props.quote;
        let info = this.props.stockInfo;
        let name = this.props.stockName;
        localStorage.setItem("quote", JSON.stringify(quote));
        localStorage.setItem("stockInfo", JSON.stringify(info));
        localStorage.setItem("stockName", JSON.stringify(name));

        this.props.history.push("./" + currentSymbol)
        //console.log(currentSymbol); 
      })
  };

  render(){
    return (
      <div>
        <div className="sbSearchBox" onChange={this.handleInputChange}>
          <button className="sbSearch" type="submit" onClick={this.findSymbol}>Search</button>
          <input className="sbSearchInput" type="text" name="query" id="query" onKeyDown={this.enterSubmit} placeholder="Name or Ticker Symbol"></input>
        </div>
        {this.state.searchBox ? (
          <div>
            <br /><br />
            <div className="sbMatchText">Which One Do You Want To Learn More About?</div>
            <br /><br />
            <div className="sbTableHeader">BEST MATCHES</div>
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
                <div className="sbSearchHeaderBox">
                  <div className="sbSearchHeader">Let's Find Your Next Investment!</div>
                </div>
                <div className="disclaimer"> *** This site does not provide financial advice. It is here to provide educational information in your process of doing your due diligence.***</div>
              </div>
            ) : (null)}
          </div>
        )}
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    matches: state.matches,
    quote: state.quote,
    stockInfo: state.stockInfo,
    stockName: state.stockName,
    timing: state.timing
  }
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch)}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));