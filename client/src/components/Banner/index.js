import React from "react";
import { withRouter } from "react-router-dom";
import "./banner.css";

const Banner = () => {
  return (
    <div className="sHeaderBox">
      <div className="sHeader">TICKER ME THIS</div>
    </div>
  )
};

export default withRouter(Banner);