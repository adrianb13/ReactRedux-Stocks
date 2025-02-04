import * as types from "./types.js";
import API from "../utils/API";

//Find General Stock Info
export const findStockSymbol = (query) => {
  return (dispatch) => {
    return API.findStockSymbol(query)
      .then(res => {
        dispatch(findStockSymbolSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const findStockSymbolSuccess = (matches) => {
  return { type: types.FIND_STOCK_SYMBOL_SUCCESS, matches}
};

export const quoteSymbol = (ticker) => {
  return (dispatch) => {
    return API.quoteSymbol(ticker)
      .then(res => {
        dispatch(quoteSymbolSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const quoteSymbolSuccess = (quote) => {
  return { type: types.QUOTE_SYMBOL_SUCCESS, quote}
};

export const companyInfo = (ticker) => {
  return (dispatch) => {
    return API.companyInfo(ticker)
    .then(res => {
      dispatch(companyInfoSuccess(res.data))
    })
    .catch(err => console.log(err));
  };
};

const companyInfoSuccess = (info) => {
  return { type: types.COMPANY_INFO_SUCCESS, info}
};


//Personal Stock List Actions
export const getStocks = () => {
  return (dispatch) => {
    return API.getStocks()
      .then(res => {
        dispatch(getStocksSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const getStocksSuccess = (stocks) => {
  return {type: types.GET_STOCKS_SUCCESS, stocks};
};

export const addStock = (stock) => {
  return (dispatch) => {
    return API.addStock(stock)
      .then(res => {
        dispatch(addStockSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const addStockSuccess = (stock) => {
  return { type: types.ADD_STOCK_SUCCESS, stock};
};

export const updateStock = (stock) => {
  return (dispatch) => {
    return API.updateStock(stock)
      .then(res => {
        dispatch(updateStockSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const updateStockSuccess = (stock) => {
  return { type: types.UPDATE_STOCK_SUCCESS, stock};
};

export const deleteStock = (stock) => {
  return (dispatch) => {
    return API.deleteStock(stock)
      .then(res => {
        dispatch(deleteStockSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const deleteStockSuccess = (stock) => {
  return { type: types.DELETE_STOCK_SUCCESS, stock};
};

export const stockName = (name) => {
  return { type: types.STOCK_NAME_SUCCESS, name}
};

export const stockChartTiming = (timing) => {
  return { type: types.STOCK_TIMING_SUCCESS, timing}
};

export const stockChartInfo = (chartInfo) => {
  return (dispatch) => {
    return API.stockCandles(chartInfo)
      .then(res => {
        dispatch(stockChartInfoSuccess(res.data))
      })
      .catch(err => console.log(err));
  };
};

const stockChartInfoSuccess = (chartInfo) => {
  return { type: types.CHART_INFO_SUCCESS, chartInfo}
};

export const stockNewsInfo = (ticker) => {
  return (dispatch) => {
    return API.stockNews(ticker)
      .then(res => {
        dispatch(stockNewsInfoSuccess(res.data))
      })
      .catch(err => console.log(err))
  };
};

const stockNewsInfoSuccess = (news) => {
  return { type : types.STOCK_NEWS_SUCCESS, news}
};

export const marketNewsInfo = () => {
  return (dispatch) => {
    return API.marketNews()
      .then(res => {
        dispatch(marketNewsInfoSuccess(res.data))
      })
      .catch(err => console.log(err))
  };
};

const marketNewsInfoSuccess = (marketNews) => {
  return { type : types.MARKET_NEWS_SUCCESS, marketNews}
};