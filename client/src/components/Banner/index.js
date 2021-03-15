import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./banner.css";

const Banner = () => {
  return (
    <Link to="/">
      <div className="sHeaderBox">
        <div className="sHeader">TICKER ME THIS</div>
      </div>
    </Link>
    
  )
};

export default withRouter(Banner);