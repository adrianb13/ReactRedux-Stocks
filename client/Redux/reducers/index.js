import * as types from "../actions/types";

const initialState = {
  stocks: []
}

const rootReducer = ( state = initialState, action ) => {
  switch(action.type){
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
    default: 
      return state;
  }
};

export default rootReducer;