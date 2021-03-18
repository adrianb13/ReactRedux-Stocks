import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { bindActionCreators } from "redux";
import "./marketNews.css";

class MarketNews extends React.Component {
  state = {
    marketNews: null,
    showNews: false
  }

  componentDidMount = () => {

  }

  getNews = () => {
    this.props.actions.marketNews()
      .then (res => {
        let marketNews = this.props.marketNews
        this.setState({
          marketNews: marketNews,
          showNews: true
        })
      })
  }

  render () {
    return (
      <div>
        <div>
          {this.state.showNews ? (
            <div>

            </div>
          ) : (
            <div>
              <div className="nFindNewsHeader">The reporter is out searching for breaking news!!!</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    marketNews: state.marketNews
  };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch)}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketNews));