import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navRoutes } from "../router/index";
let historyRoute = [];

@withRouter
class BaseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
  }

  componentWillUpdate() {}

  render() {
    const { location } = this.props.history;
    const { pathname } = location;
    const hasRoutes = historyRoute.includes(location.pathname);
    historyRoute = hasRoutes
      ? [...historyRoute.splice(historyRoute.indexOf(pathname, 1))]
      : [...historyRoute, pathname];

    const slideClass = hasRoutes ? "slideBackRight" : "slideFromLeft";

    console.log(location);
    return (
      <TransitionGroup className="baseContent ">
        <CSSTransition
          in={false}
          timeout={1000}
          classNames={slideClass}
          key={location.pathname}
        >
          <Switch location={location}>
            {navRoutes.map(route => (
              <Route
                path={route.pathname}
                key={route.pathname}
                component={route.component}
              ></Route>
            ))}
            <Redirect from="/" to="/home"></Redirect>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default BaseContent;
