import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history/history";

import StocksSearch from "./components/StocksSearch";
import StockPage from "./components/StockPage";
import Brokers from "./components/Brokers";
import MarketNews from "./components/MarketNews";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={StocksSearch} />
        <Route exact path="/brokers" component={Brokers} />
        <Route exact path="/market-news" component={MarketNews} />
        <Route exact path="/:id" component={StockPage} />
        <Route component= {StocksSearch} />
      </Switch>
    </Router>
  );
}

export default App;
