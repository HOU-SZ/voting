import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topics from "./topics";
import Home from "./home";
import Login from "./Login";
import Register from "./Register";
import Topic from "./Topic.tsx";
import Error from "./Error";

export default function Pages() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/topics">
            <Topics />
          </Route>
          <Route path="/users/login">
            <Login />
          </Route>
          <Route path="/users/register">
            <Register />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/topics/:encryptedId" children={<Topic />} />
        </Switch>
      </div>
    </Router>
  );
}
