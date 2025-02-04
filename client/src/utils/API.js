import axios from "axios";

const APIKEYPOLYGON = "&apiKey=" + process.env.REACT_APP_POLYGON_API_KEY;
const BASEURLPOLYGON = process.env.REACT_APP_POLYGON_BASE;
const NEWSURLPOLYGON = process.env.REACT_APP_POLYGON_NEWS;

const APIKEYALPHA = "&apikey=" + process.env.REACT_APP_ALPHA_API_KEY;
const BASEURLALPHA = process.env.REACT_APP_ALPHA_BASE;

const APIKEYFINNHUB = "&token=" + process.env.REACT_APP_FINNHUB_API_KEY;
const BASEURLFINNHUB = process.env.REACT_APP_FINNHUB_BASE;


const API = {
  getStocks: () => {
    return axios.get("/api/stocks")
  },
  addStock: (stockData) => {
    return axios.post("/api/stocks", stockData);
  },
  updateStock: (stock) => {
    return axios.put("/api/stocks/" + stock.id, stock);
  },
  deleteStock: (stockId) => {
    return axios.delete("/api/stocks/" + stockId);
  },

  //General Search & Info for Stocks
  findStockSymbol: (query) => {
    //Finnhub Search
    //let search = "search?q=" + query + "&symbol?exchange=US";
    //return axios.get(BASEURLFINNHUB + "search?q=" + query + APIKEYFINNHUB);
    
    //Alpha Search
    //let search = "function=SYMBOL_SEARCH&keywords=" + query + APIKEYALPHA;
    //return axios.get(BASEURLALPHA + search);
    
    //Polygon Search
    let search = "tickers?sort=ticker&locale=us&search=" + query +"&perpage=10&page=1" + APIKEYPOLYGON;
    return axios.get(BASEURLPOLYGON + search)

  },
  quoteSymbol: (ticker) => {
    //Finnhub Quote
    return axios.get(BASEURLFINNHUB + "quote?symbol=" + ticker + APIKEYFINNHUB);
    
    //Alpha Quote
    //let quote = "function=GLOBAL_QUOTE&symbol=" + symbol + APIKEYALPHA;
    //return axios.get(BASEURLALPHA + quote);
  },
  companyInfo: (ticker) => {
    //Alpha Info
    let info = "function=OVERVIEW&symbol=" + ticker + APIKEYALPHA;
    return axios.get(BASEURLALPHA + info);
  },
  stockCandles: (stock) => {
    //Finnhub Candles
    let candles = "stock/candle?symbol=" + stock.symbol + "&resolution=" + stock.resolution + "&from=" + stock.open + "&to=" + stock.close + APIKEYFINNHUB;
    return axios.get(BASEURLFINNHUB + candles);
  },
  stockNews: (ticker) => {
    let news = ticker + "/news?perpage=15&page=1" + APIKEYPOLYGON;
    return axios.get(NEWSURLPOLYGON + news);
  },
  marketNews: () => {
    let marketNews = "news?category=general" + APIKEYFINNHUB;
    return axios.get(BASEURLFINNHUB + marketNews);
  }

}

export default API;