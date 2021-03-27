import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
//import API from "../../utils/API";
import "./stocksSearch.css";

import Banner from "../Banner";
import SearchBar from "../SearchBar";

class StocksSearch extends React.Component {
  state = {
    searchIntro: true
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
      //console.log("Sun", UTCDay); 
      //Need Friday Chart
      let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-2)/1000 + 39600;
      let marketClose = marketOpen + 46800;
      let timing = {
        marketOpen: marketOpen,
        marketClose: marketClose
      }
      this.props.actions.stockChartTiming(timing);
      localStorage.setItem("timing", JSON.stringify(timing));

    } else if(UTCDay === 6){
      //console.log("Sat", UTCDay)
      //Need Friday Chart
      let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-1)/1000 + 39600;
      let marketClose = marketOpen + 46800;
      let timing = {
        marketOpen: marketOpen,
        marketClose: marketClose
      }
      this.props.actions.stockChartTiming(timing);
      localStorage.setItem("timing", JSON.stringify(timing));

    } else if (UTCDay === 1 || UTCDay === 2 || UTCDay === 3 || UTCDay === 4 || UTCDay === 5){
      //console.log("Weekday")
      //Monday before Market Open - Need Friday Chart
      if(UTCDay === 1 && date1 < (UTC + 39600) ){
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-3)/1000 + 39600;
        let marketClose = marketOpen + 46800;
        let timing = {
          marketOpen: marketOpen,
          marketClose: marketClose
        }
        this.props.actions.stockChartTiming(timing);
        localStorage.setItem("timing", JSON.stringify(timing));

      //Current Weekday in AH or Pre-Market
      } else if(UTCDay >= dateDay && date1 < (UTC + 39600)) {
        //console.log("Market AH/PM")
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()-1)/1000 + 39600;
        let marketClose = marketOpen + 46800;
        let timing = {
          marketOpen: marketOpen,
          marketClose: marketClose
        }
        this.props.actions.stockChartTiming(timing);
        localStorage.setItem("timing", JSON.stringify(timing));

      //Market is Open
      } else {
        //console.log("Market Open")
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())/1000 + 39600;
        let marketClose = marketOpen + 46800;
        let timing = {
          marketOpen: marketOpen,
          marketClose: marketClose
        }
        this.props.actions.stockChartTiming(timing);
        localStorage.setItem("timing", JSON.stringify(timing));

      }
    }
  };

  checkSubmit = (bool) => {
    
  }


  render () {
    return (
      <div className="backBlack">
        <Banner />
        <div className="sDBArea">
          <div className="sDotBorder"></div>
          <div className="sHeaderText">
            <div><span className="sRed">DON'T DELAY,</span> INVEST IN YOUR FUTURE NOW!</div>
            <div><span style={{marginLeft: "30px"}}>UR {"\u25B2"} 100%</span></div>
          </div>
          <div className="sDotBorder"></div>
        </div>
        <br />
        <SearchBar
          searchIntro={true}
          checkSubmit={this.checkSubmit}
        />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return { 
    timing: state.timing
  }
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StocksSearch));