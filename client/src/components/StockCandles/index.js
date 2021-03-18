import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./stockCandles.css";
//import PLUGplot from "./PLUGresponse5.json";

import Chart from "react-apexcharts";


//UNIX (3/1/21 4am): 1614600000 1614752870
//UNIX (3/1/21 5pm): 1614646800
//UNIX (3/2/21 4am): 1614686400 (12pm UTC)
//UNIX (3/2/21 5pm): 1614733200 ( 1am UTC)


class StockCandles extends React.Component {
  state = {
    options: { 
      chart: {
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
            menu: false
          }
        }
      },
      title: {
        text: "5-Min Chart",
        align: "center",
        style: {
          color: "white"
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: "white"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "white"
          }
        }
      },
      annotations: {
        
      }
    },
    series: [
      {
        name: "",
        data: []
      }
    ],
    chartPlots: null,
    showChart: false
  }

  componentDidMount = () => {
    this.getChartInfo()
  }

  getChartInfo = () => {
    let timespan = null;
    let name = null

    if(this.props.timing !== null){
      timespan = this.props.timing;
      name = this.props.stockName;
     
      let chartTimeSpan = {
        symbol: name.ticker,
        resolution: 5,
        open: timespan.marketOpen,
        close: timespan.marketClose
      }
      this.props.actions.stockChartInfo(chartTimeSpan)
        .then(res => {
          this.setState({
            chartPlots: this.props.chartInfo,
          }, () => {
            localStorage.setItem("chartPlots", JSON.stringify(this.props.chartInfo))
            this.plotPoints(this.state.chartPlots)
          })

        })
    } else {
      timespan = JSON.parse(localStorage.getItem("timing"));
      name = JSON.parse(localStorage.getItem("stockName"));
      let chartPlots = JSON.parse(localStorage.getItem("chartPlots"))
      this.plotPoints(chartPlots)
    }    
  };

  plotPoints = (chartPlots) => {
    if(chartPlots.s !== "no_data"){
      let data1 = []
      /* [[Timestamp], [O, H, L, C]] */
      for(let i = 0; i < chartPlots.t.length; i++){
          let time = chartPlots.t[i] * 1000;
          let pair = {
            "x": new Date(time).toLocaleTimeString("en-US"),
            "y": [chartPlots.o[i].toFixed(2), chartPlots.h[i].toFixed(2), chartPlots.l[i].toFixed(2), chartPlots.c[i].toFixed(2) ]
          }
          data1.push(pair)      
      };
      this.setState(prevState => ({
        ...prevState,
        series: [{
          ...prevState.series,
          data: data1
        }],
        showChart: true
      }))
    }
  };

  render (){
    return(
      <div>
        {this.state.showChart ? (
          <div className="scCandleChart">
            <Chart 
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
              width="100%"
              height="auto"
            />
          </div>
        ) : (null)}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    quote: state.quote,
    stockInfo: state.stockInfo,
    stockName: state.stockName,
    timing: state.timing,
    chartInfo: state.chartInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(StockCandles));