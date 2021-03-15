import React from "react";
import { withRouter } from "react-router-dom";
import "./broker.css";
import "../../App.css";

import Banner from "../Banner";

const Brokers = () => {
  return(
    <div className="backBlack">
      <Banner />
      <div className="sDotBorder"></div>
      <div className="bHeader">Need A Broker??? Search Your Options Below</div>
      <div className="bBox">
        <div className="bSection">
          <a href="https://act.webull.com/ion/GDwDJ5UtXvHT/vpk/Wheel/wb_oversea" target="_blank" rel="noreferrer">
            <div className="webull"></div>  
            <div className="bLinkText">Click To Join WeBull & Get 2 Free Stocks</div>
          </a>
          <div className="bBullets">
            <div className="bComparisonHeader">Advantages</div>
            <div className="bPoints">- No Commission Trading and Instant Deposit Limit</div>
            <div className="bPoints">- You can trade from 4am to 8pm (EST) before any other platform & broker. Great for trading before the majority gets word of any news.</div>
            <div className="bPoints">- You can add detailed chart indicators that you prefer such as RSI, EMA, and MACD.  Great for doing your Technical Analysis on a stock</div>
            <div className="bPoints">- Mobile App has a social aspect where you can see comments on both sides of the trade. Which can allow you to catch news not yet announced by mainstream media.</div>
            <div className="bPoints">- Hot Keys are customizable on the Desktop platform for quick and easy trades (assuming you already know what you're doing as a trader/investor)</div>
            <div className="bPoints">- Decidated "News" section with updates that are immediate and frequent from mainstream outlets.</div>
            <div className="bPoints">- This is the gateway to more intricate and complicated Trading platforms for the serious Day Traders though many traders are loyal to this app due to it's market trading hours.</div>
            <br />
            <div className="bComparisonHeader" style={{color: "red"}}>Disadvantages</div>
            <div className="bPoints">- Information and layout can be overwhelming for someone just starting to invest. New investors should consult someone familiar with the application to help them learn the process.  You don't want to miss a trade because you don't know how to use the app.</div>
            <div className="bPoints">- Currently no OTC Market investing, but you can follow them on a watchlist.</div>
            <div className="bPoints">- Almost too many sections to keep track of depending on the size of your portfolio as far as the number of stocks and your watchlist(s).</div>
            <div className="bPoints">- The Social aspect can be a blessing or curse if you are easily swayed by other investor's opinions.</div>
            <div className="bPoints">- Takes some practice to understand the trading process, but once understood the trading options you have a much more flexible compared to SoFi and Robinhood.</div>
          </div>
        </div>
        
        <div className="bSection bBorders">
          <a href="https://www.sofi.com/share/invest/3640166" target="_blank" rel="noreferrer">
            <div className="sofi"></div>
            <div className="bLinkText">Click To Join SoFi Bank & Get $50 In Stock</div>
          </a>
          <div className="bBullets">
            <div className="bComparisonHeader">Advantages</div>
            <div className="bPoints">- No Commission Trading and Instant Deposit Limit</div>
            <div className="bPoints">- Opening an account immediately opens the door for Investing, Online Banking/Wallet, Loans, and other traditional financial products you find at your standard brick & mortar bank.</div>
            <div className="bPoints">- The design is very-user friendly and is great for new investors. (Almost too basic).</div>
            <div className="bPoints">- The stock information is simple and easy to read without detailed indicators (can also be a disadvantage for seasoned investors)</div>
            <div className="bPoints">- Allows for a social twitter-like aspect where you can see when certain people are buying and selling on each stock. This allows you to follow investors and "be in the know" of what the seasoned investors are exactly doing.</div>
            <div className="bPoints">- If you were looking to leave a traditional bank while still having the traditional bank products, this is a great option.</div>
            <div className="bPoints">- They are continuing to build out new features, so just because something is not a feature now does not mean it isn't being worked on as an update in the future.</div>
            <br />
            <div className="bComparisonHeader" style={{color: "red"}}>Disadvantages</div>
            <div className="bPoints">- If you are used to brick & mortar banking & investing, this may not be good for you.</div>
            <div className="bPoints">- Currently NO OPTIONS TRADING.</div>
            <div className="bPoints">- Other investors can see exactly what you're doing, if you do not keep your own activity private.</div>
            <div className="bPoints">- This is geared more towards very long term investing where the pennies may not matter as much, since you are waiting on significant gains in the long run.  Swing and Day traders should use another application. The only thing you have to rely on for trading analysis is the price action and a line graph. (Does not even have a candlestick chart option).</div>
            <div className="bPoints">- For an experienced trading looking for technical indicators and analysis, this isn't a good option (at least not yet).</div>
          </div>
        </div>
        
        <div className="bSection">
          <a href="https://join.robinhood.com/adrianb1004" target="_blank" rel="noreferrer">
            <div className="robinhood"></div>
            <div className="bLinkText">Click To Join Robinhood & Get 1 Free Stock</div>
          </a>
          <div className="bBullets">
            <div className="bComparisonHeader">Advantages</div>
            <div className="bPoints">- No Commission Trading and Instant Deposit Limit</div>
            <div className="bPoints">- The first app of it's kind with a VERY simple and user-friendly application. This is the go-to app for new Investors.</div>
            <div className="bPoints">- Immediate Cash availability on sold securities/cryptocurrencies (no settlement times when making a new trade, only when you are withdrawing the money to your bank account.) This means you can trade frequent and often using your cash buying power and not using margin.</div>
            <div className="bPoints">- The layout is very fluid and easy to follow.  The learning curve for using the application is very minimal.  You can be up and running within minutes.</div>
            <div className="bPoints">- The stock information is simple and easy to read without detailed indicators (can also be a disadvantage for seasoned investors). Does have a "candlestick" chart option unlike SoFi.</div>
            <div className="bPoints">- They also offer an online wallet where you can use your available cash like a bank account.</div>
            <br />
            <div className="bComparisonHeader" style={{color: "red"}}>Disadvantages</div>
            <div className="bPoints">- Currently No OTC Market Trading.</div>
            <div className="bPoints">- It's almost too easy to get yourself in financial trouble if you have no idea what you are doing and just trading without understanding the full process. Especially with Options Trading. Search "WallStreetBets" and you'll see what I mean.</div>
            <div className="bPoints">- There is no social aspect to this (which can also be a benefit depending on how easily swayed by opinion you are as an investor).</div>
            <div className="bPoints">- For an experienced trading looking for technical indicators and analysis, this isn't a good option (at least not yet). You are limited to a "candlestick" chart and line graph.</div>
            <div className="bPoints">- Customer Service is hard to get a hold of, but that has been recently address by hiring more personnel to answer inquiries.</div>
          </div>
        </div>
      </div>
      <div className="disclaimer"> *** This site does not provide financial advice. It is here to provide educational information in your process of doing your due diligence.***</div>
    </div>
  )
}

export default withRouter(Brokers);