import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navRoutes } from "../router/index";

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
    const { location, action } = this.props.history;
    console.log(`%c ${action}`, "color:red;font-size:20px;font-weight:bold");
    const classMap = {
      PUSH: "slideFromLeft",
      POP: "slideBackRight",
      REPLACE: "slideFromLeft"
    };
    console.log(location);
    return (
      <TransitionGroup
        className="baseContent"
        // childFactory={child =>
        //   React.cloneElement(child, { classNames: classMap[action] })
        // }
      >
        <CSSTransition timeout={300} key={location.pathname}>
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
