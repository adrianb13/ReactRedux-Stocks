import React from "react";
import { withRouter, Link } from "react-router-dom";
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
    notFound: false,
    query: null
  }

  componentDidMount = () => {
    this.checkPage();
  }

  componentDidUpdate = (nextProps) => {
    if(nextProps.match.params.id !== this.props.match.params.id){
      this.checkPage();
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
      this.findSymbol();
    }
  };

  checkPage = () => {
    if(this.props.match.path !== "/"){
      let id = this.props.match.params.id
      this.setState({
        query: id
      }, () => {
        this.findSymbol();
      })
    }
  }

  findSymbol = () => {  
    this.setState({
      searchIntro: false,
      notFound: false
    });
    /* Allows for check if new search was submitted */
    this.props.checkSubmit(true);
    
    let search = null;
    if(this.props.match.path !== "/:id"){
      search = this.state.query;
    } else if (this.state.query) {
      search = this.state.query;
    } else if (this.props.match.path === "/:id"){
      search = this.props.match.params.id;
    }
    
    this.props.actions.findStockSymbol(search)
      .then(res => {
        let results = this.props.matches.tickers;
        if(results.length > 1){
          let bestMatches = results.filter(stock => stock.currency === "USD")

          /* Used when on "./:id" but has multiple matches based on name. Reduces matches to single Stock */
          if(this.props.match.path === "/:id" && search === this.props.match.params.id ){
            bestMatches = bestMatches.filter(match => match.ticker === this.props.match.params.id)
          }
          
          /* Otherwise, this is the normal tree based on Search results ignoring the previous "if" */
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
          this.setState({
            notFound: true
          })
          //console.log("no matches")
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
    this.props.actions.stockName(symbol)
    this.props.actions.quoteSymbol(currentSymbol)
    this.props.actions.companyInfo(currentSymbol)
      .then(res => {
        this.props.checkSubmit(false);
        let quote = this.props.quote;
        let info = this.props.stockInfo;
        let name = this.props.stockName;
        localStorage.setItem("quote", JSON.stringify(quote));
        localStorage.setItem("stockInfo", JSON.stringify(info));
        localStorage.setItem("stockName", JSON.stringify(name));

        this.props.history.push("./" + currentSymbol)
      })
  };

  render(){
    return (
      <div>
        
        <div className="sbLinkBox">
          <div className="brokerLink">
            <Link to="/brokers">
              <div>Need A Broker? Comparison Here!</div>
            </Link>
          </div>
          <div className="brokerLink">
            <Link to="/market-news">
              <div>Want The Latest Market News?</div>
            </Link>
          </div>
        </div>
        
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
            ) : (
              <div>
                {this.state.notFound ? (
                  <div className="sbNotFoundBox">
                    <div className="sbNotFoundText">Sorry, <span className="red">no company info found</span> under this name or ticker symbol.</div>
                    <div className="sbNotFoundText">Please try your search again.</div>
                  </div>
                ) : (null)}
              </div>
            )}
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