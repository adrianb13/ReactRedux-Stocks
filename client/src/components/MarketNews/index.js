import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./marketNews.css";
import API from "../../utils/API";

import Banner from "../Banner/index";

const MarketNews = () => {
  const [marketNews, setMarketNews] = useState([]);
  const [showNews, setShowNews] = useState(false);
  
  useEffect(() => {
    fetchNews()
  }, []);

  //Gets Market News from API
  const fetchNews = async () => {
    API.marketNews()
      .then(res => {
        setMarketNews(res.data)
        setShowNews(true)
      })
  };

  //Converts UNIX timestamp to Local Date String
  const dateConvert = (timestamp) => {
    let date = new Date((timestamp * 1000)).toString();
    date = new Date(date).toLocaleDateString("en-US").split("-")
    return date;
  };

  //Styles Article Icon
  const newsIcon = (icon) => {
    let styling = {
      width: "100px",
      height: "70px",
      background: "url("+icon+")",
      backgroundSize: "100% 100%",
      borderRadius: "5px"
    }
    return styling;
  };

  return (
    <div className="backBlack">
      <div>
        <Banner />
        <div className="sDotBorder"></div>
        {showNews ? (
          <div>
            <div className="mnHeader">Latest News</div>
            {marketNews.map(news => (
              <div className="mnArticleBox" key={news.id}>
                <div style={newsIcon(news.image)}></div>
                <div className="mnArticle">
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="mnHeadline">{news.headline}</div>
                    <div className="mnDate">Posted - {dateConvert(news.datetime)}</div>
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

export default withRouter((MarketNews));