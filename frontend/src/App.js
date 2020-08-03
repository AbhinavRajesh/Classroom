import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/SignIn";

const App = () => {
  let checkAuth = false;
  const changeAuthStatus = () => {
    checkAuth = true;
    console.log("It was here!");
  };
  return (
    <Router>
      <div className="App">
        {checkAuth ? (
          <div>Authenticated!</div>
        ) : (
          <div>
            <Route path="/" exact={true} component={Home} />
            <Route
              path="/login"
              component={Login}
              changeAuthStatus={this.changeAuthStatus}
            />
            <Route path="/signin" component={SignIn} />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
