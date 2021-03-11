import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./stockPage.css";
import "../StocksSearch/stocksSearch.css";

import Banner from "../Banner";
import StockQuoteChart from "../StockQuoteChart/index";
import CompanyInfo from "../CompanyInfo";
import SearchBar from "../SearchBar";

class StockPage extends React.Component {
  state = {
    currentStockQuote: null,
    currentStockChange: null,
    currentStockPercent: null,
    currentStockName: null,
    timing: null,
    stockAvailable: false,
    companyInfoAvailable: false,
    newSearch: false
  };

  componentDidMount = () => {
    this.checkData();
    console.log(this.props.timing)
  };

  componentDidUpdate = (nextProps) => {
    if(nextProps.quote !== this.props.quote){
      this.checkData();
    }
    if(nextProps.stockInfo !== this.props.stockInfo){
      this.companyInfo();
    }
  }

  checkData = () => {
    if(this.props.quote.length !== 0){
      this.companyInfo();
      let quote = this.props.quote;
      let name = this.props.stockName;
      let timing = this.props.timing;
      this.setState({
        currentStockQuote: quote,
        currentStockName: name,
        timing: timing,
        newSearch: false
      }, () => {
        this.quoteInfo();
        //console.log(this.state.currentStockName)
      })
    } else {
      let quote = JSON.parse(localStorage.getItem("quote"));
      let name = JSON.parse(localStorage.getItem("stockName"));
      let timing = JSON.parse(localStorage.getItem("timing"));
      
      this.setState({
        currentStockQuote: quote,
        currentStockName: name,
        timing: timing,
        newSearch: false
      }, () => {
        this.quoteInfo();
        this.companyInfo();
      })
    }
  }

  quoteInfo = () => {
    //Alpha Quote - Must update UI states in StockQuoteChart
    /* let quote = this.props.quote["Global Quote"]
    this.setState({
      currentStockQuote: quote,
      stockAvailable: true
    }) */
    if(this.state.currentStockQuote){
      let change = this.state.currentStockQuote.c - this.state.currentStockQuote.pc;
      let percent = change / this.state.currentStockQuote.pc * 100;
      change = change.toFixed(2);
      percent = percent.toFixed(2);
      this.setState({
        currentStockChange: change,
        currentStockPercent: percent,
        stockAvailable: true,
      });
    }
    
  };

  companyInfo = () => {
    if(this.props.stockInfo.length !== 0){
      let info = this.props.stockInfo;
      this.setState({
        currentStockInfo: info,
        companyInfoAvailable: true
      });
    } else {
      let info = JSON.parse(localStorage.getItem("stockInfo"));
      this.setState({
        currentStockInfo: info,
        companyInfoAvailable: true
      });
    }
  };

  checkSubmit = (bool) => {
    if(bool === true){
      this.setState({
        newSearch: true,
        stockAvailable: false,
        companyInfoAvailable: false,
      })
      
    } else (
      this.setState({
        newSearch: false
      })
    )
  }


  render () {
    return (
      <div className="backBlack">
        <Banner />
        <div className="sDotBorder"></div>
        <br/>
        <SearchBar 
          searchIntro={false}
          checkSubmit={this.checkSubmit}
        />
        {this.state.newSearch ? (null) : (
          <div>
            {this.state.stockAvailable ? (
              <div>
                <div className="sTableArea">  
                  <StockQuoteChart 
                    ticker={this.state.currentStockName.ticker}
                    tickerName={this.state.currentStockName.name}
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
        )}
        
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) => {
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockPage));