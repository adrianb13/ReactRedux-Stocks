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
    searchIntro: true,
    holidayAdjust: 0
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
   
    this.holidays(UTC, date1)
    this.openClose(date, dateDay, date1, UTC, UTCDay);
  };

  //Check if NYSE market is closed for a holiday
  holidays = (UTC, date1) => {
    let holidays = ["01/01/2021", "01/02/2021", "01/03/2021", "01/18/2021", "02/15/2021", "04/02/2021", "04/03/2021", "04/04/2021", "05/31/2021","07/05/2021", "09/06/2021", "11/25/2021", "12/24/2021", "12/25/2021", "12/26/2021", "01/17/2022", "02/21/2022", "04/15/2022", "04/16/2022", "04/17/2022", "05/30/2022", "07/04/2022", "09/05/2022", "11/21/2022", "12/26/2022", "01/02/2023", "01/16/2023", "02/20/2023", "04/07/2023", "04/08/2023", "04/09/2023", "05/29/2023", "07/04/2023", "09/04/2023", "11/23/2023", "12/25/2023"]
    let closed = holidays.filter(day => parseInt((new Date(day).getTime() / 1000).toFixed(0)) === UTC);
    
    //Need to go 1 extra day earlier since market has no info for the holiday
    //Example: If Monday is holiday, get Friday. If Friday is holiday, get Thursday
    if(closed.length !== 0){
      this.setState({
        holidayAdjust: 1
      })
      return
    }

    //Checking early before pre-market & market open when prior day was a holiday
    //Example: If Monday was a holiday and checking Tuesday before market, still need Friday.
    let early = holidays.filter(day => parseInt((new Date(day).getTime() / 1000 + 86400).toFixed(0)) === UTC);
    if(early.length !==0 && date1 < (UTC + 39600)){
      this.setState({
        holidayAdjust: 1
      })
      return
    }
  };

  //Get Correct/Latest Market Info
  openClose = (date, dateDay, date1, UTC, UTCDay) => {
    if(UTCDay === 0){
      //console.log("Sun"); 
      //Need Friday Chart
      let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()- (2 + this.state.holidayAdjust))/1000 + 39600;
      let marketClose = marketOpen + 46800;
      let timing = {
        marketOpen: marketOpen,
        marketClose: marketClose
      }
      this.props.actions.stockChartTiming(timing);
      localStorage.setItem("timing", JSON.stringify(timing));

    } else if(UTCDay === 6){
      //console.log("Sat")
      //Need Friday Chart
      let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()- (1 + this.state.holidayAdjust))/1000 + 39600;
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
        //console.log("Monday Before Market & Pre-market")
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()- (3  + this.state.holidayAdjust))/1000 + 39600;
        let marketClose = marketOpen + 46800;
        let timing = {
          marketOpen: marketOpen,
          marketClose: marketClose
        }
        this.props.actions.stockChartTiming(timing);
        localStorage.setItem("timing", JSON.stringify(timing));

      //Current Weekday in AH going into next day Pre-Market
      } else if(UTCDay >= dateDay && date1 < (UTC + 39600)) {
        //console.log("Market AH/PM")
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()- (1  + this.state.holidayAdjust))/1000 + 39600;
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
        let marketOpen = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - (this.state.holidayAdjust))/1000 + 39600;
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