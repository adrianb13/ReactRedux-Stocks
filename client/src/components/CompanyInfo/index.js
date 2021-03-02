import React from "react";
import { withRouter } from "react-router-dom";
import "./companyInfo.css";

const CompanyInfo = (props) => {
  return (
    <div className="cCompanySection">
      <div className="cCompanyHeaderBox">
        <div className="cCompanyName">{props.companyInfo.Name}</div>
        <div><span style={{width: "1px", marginLeft: "50px"}}></span>{props.companyInfo.Description}</div>
      </div>

      <div className="cCompanyBreakdownBox">
        <div className="cCompanyFundamentals">
          <div className="cCompanyDetailsHeader">Company Details</div>
          <div className="cCompanyAddress">Address: {props.companyInfo.Address}</div>
          <div>Employees: {props.companyInfo.FullTimeEmployees}</div>
          <div>Market Cap: {props.companyInfo.MarketCapitalization}</div>
          <div>Sector: {props.companyInfo.Sector}</div>
          <div>Industry: {props.companyInfo.Industry}</div>
          <div>EBITDA: {props.companyInfo.EBITDA}</div>
          <div>Trailing PE: {props.companyInfo.TrailingPE}</div>
          <div>Forward PE: {props.companyInfo.ForwardPE}</div>
          <div>PE Ratio: {props.companyInfo.PERatio}</div>
          <div>Earnings/Share: {props.companyInfo.EPS}</div>
          <div>Revenue/Share: {props.companyInfo.RevenuePerShareTTM}</div>
          <div>Profit Margin: {props.companyInfo.ProfitMargin}</div>
        </div>
        <div className="cCompanyTechnicals">
          <div className="cCompanySharesHeader">Share Details</div>
          <div>Dividend Yield: {props.companyInfo.DividendYield}%</div>
          <div>52 Week High: ${props.companyInfo["52WeekHigh"]}</div>
          <div>52 Week Low: ${props.companyInfo["52WeekLow"]}</div>
          <div>Shares Outstanding: {props.companyInfo.SharesOutstanding}</div>
          <div>Shares Float: {props.companyInfo.SharesFloat}</div>
          <div>Shares Short: {props.companyInfo.SharesShort}</div>
          <div>Shares Short (Prior Month): {props.companyInfo.SharesShortPriorMonth}</div>
          <div>Short Ratio: {props.companyInfo.ShortRatio}%</div>
          <div>Short % Outstanding: {props.companyInfo.ShortPercentOutstanding}</div>
          <div>Short % Float: {props.companyInfo.ShortPercentFloat}%</div>
          <div>Insider Percentage: {props.companyInfo.PercentInsiders}%</div>
          <div>Institution Percentage: {props.companyInfo.PercentInstitutions}%</div>
        </div>
      </div>
      <br />
      <div className="disclaimer"> *** This site does not provide financial advice. It is here to provide educational information in your process of doing your due diligence.***</div>
      <br />
    </div>
  )
};

export default withRouter((CompanyInfo));