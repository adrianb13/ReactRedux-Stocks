import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history/history";

import Stocks from "./components/Stocks";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Stocks} />
        <Route component= {Stocks} />
      </Switch>
    </Router>
  );
}

export default App;
