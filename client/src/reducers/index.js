import * as types from "../actions/types";

const initialState = {
  matches: [],
  quote: [],
  stockInfo: [],
  stocks: [],
  stockName: null,
  timing: null,
  chartInfo: []
}

const rootReducer = ( state = initialState, action ) => {
  switch(action.type){
    case types.FIND_STOCK_SYMBOL_SUCCESS:
      return Object.assign({}, state, {
        matches: action.matches
      });
    case types.QUOTE_SYMBOL_SUCCESS:
      return Object.assign({}, state, {
        quote: action.quote
      });
    case types.COMPANY_INFO_SUCCESS:
      return Object.assign({}, state, {
        stockInfo: action.info
      });
      
    case types.GET_STOCKS_SUCCESS:
      return Object.assign({}, state, {
        stocks: state.stocks.concat(action.stocks)
      });
    case types.ADD_STOCK_SUCCESS:
      return Object.assign({}, state, {
        stocks: state.stocks.concat(action.stock)
      });
    case types.UPDATE_STOCK_SUCCESS:
      const listS = Object.assign([], state.stocks);
      const itemS = listS.filter(stock => stock.id === action)
      const indexS = listS.indexOf(itemS[0]);
      listS.splice(indexS, 1, action.stock)
      return Object.assign({}, state, {
        stocks: listS
      });
    case types.DELETE_STOCK_SUCCESS:
      const newStateS = Object.assign([], state.stocks);
      const removeStock = newStateS.filter(stock => {
        return parseInt(stock.id) === parseInt(action.stock)
      })
      const idS = newStateS.indexOf(removeStock[0]);
      newStateS.splice(idS, 1);
      return Object.assign({}, state, {
        trackers: newStateS
      });

    case types.STOCK_NAME_SUCCESS:
      return Object.assign({}, state, {
        stockName: action.name
      })
    case types.STOCK_TIMING_SUCCESS:
      return Object.assign({}, state, {
        timing: action.timing
      });
    case types.CHART_INFO_SUCCESS:
      return Object.assign({}, state, {
        chartInfo: action.chartInfo
      });
    default: 
      return state;
  }
};

export default rootReducer;