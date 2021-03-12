import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history/history";

import StocksSearch from "./components/StocksSearch";
import StockPage from "./components/StockPage";
//import StockCandles from "./components/StockCandles";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={StocksSearch} />
        <Route exact path="/:id" component={StockPage} />
        <Route component= {StocksSearch} />
      </Switch>
    </Router>
  );
}

export default App;
