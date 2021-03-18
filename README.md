# Ticker Me This

This is a research tool for investors in the U.S. Stock Market. 
The application was deployed here: https://tickermethis.herokuapp.com/

## About

The application allows you to research the fundamentals and general company info of a company. An investor can find the details of the stock such as the recent candlestick chart of the day, it's highs and lows, current share float percentage, and institutional ownership to name a few.  If also gives a comparative breakdown of potential brokers if you are new to investing or just want to try a different brokerage.

## Walkthrough

### Searching For A Ticker
  1. First, you can search by either the stock ticker or company name.
  * If there is only one security that matches the query, it will automatically load the available information.
  * If there are multiple matches to your search, you can read the matches and select the one you were looking for.
    - As an example, searching "Apple" returns Apple Inc. (iPhone maker) as well as Apple Hospitality REIT and other companies including "Apple" as part of it's name.  Searching AAPL automatically returns Apple Inc. stock info.
    
  2. Once the info is provided, use the information provided to determine whether you want to invest or not.
  
  3. There were 3 APIs used to provide the full breakdown for each company.  Those were Finnhub.io, AlphaVantage, and Polygon.io.  Each has it's own breakdown of how they provided information, so I chose the API with the most provided information for each topic listed on the page (i.e. Stock Info, Company Info, and Quoting and Charting info).  Also with the free versions of the API, spreading the call information also allows the app to run on the free version until if becomes a commercial application.

### Comparing Brokerages
  1. Clicking the "Need a Broker" link leads you to the brokerage page.
  * It compares WeBull, SoFi Bank, and Robinhood.
  * Each offers it's own advantages and disadvantages that I have broken down in the comparison.
  * You are able to click the provided links to sign up for each brokerage and obtain special perks buy using the links provide, such as a free stock for signing up.

### Potential Updates & Possible Commercialization
  1. I am looking to add a "News" page for the market and potentially individual stocks.  Still looking for an API that provides a complete list of up-to-date articles for each stock. I want to try and provide a broad news page for individual stocks that balance the bias on both sides for "bulls" and "bears".
  
  2. For commercial purposes, the APIs do allow for real-time ticker updates and more in-depth chart breakdowns when using the commercial paid versions. This would be the equivalent of creating a app exactly like Robinhood or WeBull.  This would also require scaling of servers and data processing, but the potential is there.
