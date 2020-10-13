import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.scss";
import App from "./components/App";
import { store } from "./redux/store/configureStore";
import Instruction from "./components/Instruction";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/instructions" component={Instruction} exact />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);
