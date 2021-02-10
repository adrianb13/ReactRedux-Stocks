import * as types from "./types.js";
import API from "../utils/API";

export const getStocks = () => {
  return (dispatch) => {
    return API.getStocks()
      .then(res => {
        dispatch(getStocksSuccess(res.data))
      })
      .catch(err => console.log(err));
  ;}
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