import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./marketNews.css";

import Banner from "../Banner/index";

class MarketNews extends React.Component {
  state = {
    marketNews: null,
    showNews: false
  };

  componentDidMount = () => {
    this.getNews();
  };

  getNews = () => {
    this.props.actions.marketNewsInfo()
      .then (res => {
        let marketNews = this.props.marketNews
        this.setState({
          marketNews: marketNews,
          showNews: true
        })
      })
  };

  dateConvert = (timestamp) => {
    let date = new Date((timestamp * 1000)).toString();
    date = new Date(date).toLocaleDateString("en-US").split("-")
    return date;
  }

  newsIcon = (icon) => {
    let styling = {
      width: "100px",
      height: "70px",
      background: "url("+icon+")",
      backgroundSize: "100% 100%",
      borderRadius: "5px"
    }
    return styling;
  }

  render () {
    return (
      <div className="backBlack">
        <div>
          <Banner />
          <div className="sDotBorder"></div>
          {this.state.showNews ? (
            <div>
              <div className="mnHeader">Latest News</div>
              {this.state.marketNews.map(news => (
                <div className="mnArticleBox" key={news.id}>
                  <div style={this.newsIcon(news.image)}></div>
                  <div className="mnArticle">
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <div className="mnHeadline">{news.headline}</div>
                      <div className="mnDate">Posted - {this.dateConvert(news.datetime)}</div>
                      <div className="mnSummary">{news.summary}</div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="mnFindNewsHeader">The reporter is out searching for breaking news!!!</div>
            </div>
          )}
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    marketNews: state.marketNews
  };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketNews));