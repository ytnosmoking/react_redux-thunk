import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { navRoutes } from "../router/index";
// import BaseError from "./BaseError";

@withRouter
class BaseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
  }
  componentDidMount() {
    // const buf = Buffer.from("MTIz", "base64").toString();
    // console.log(buf);
    // console.log(buf.toString());
  }

  render() {
    const { location, action } = this.props.history;
    console.log(this.props);
    console.log(`%c ${action}`, "color:red;font-size:20px;font-weight:bold");
    // eslint-disable-next-line no-unused-vars
    const classMap = {
      PUSH: "slideFromLeft",
      POP: "slideBackRight",
      REPLACE: "slideFromLeft"
    };
    // const routes = this.state.routes;
    // const pathname = location.pathname;
    // const hasRoute = routes.includes(pathname);
    // if (!hasRoute) {
    //   this.setState({
    //     routes: [...this.state.routes, pathname]
    //   });
    // }
    // const animated = hasRoute ? "slideBackRight" : "slideFromLeft";
    // console.log(classMap[action]);
    // console.log(animated);
    return (
      <TransitionGroup
        className="baseContent"
        childFactory={
          child => React.cloneElement(child, { classNames: classMap[action] })
          // React.cloneElement(child, { classNames: animated })
        }
      >
        <CSSTransition
          timeout={{ enter: 1000, exit: 2000 }}
          key={location.pathname}
        >
          {/* <div className="baseContent"> */}
          <Switch location={location}>
            {navRoutes.map(route => (
              <Route
                path={route.pathname}
                key={route.pathname}
                // render={() => <BaseError>{() => route.component}</BaseError>}
                component={route.component}
              ></Route>
            ))}
            <Redirect from="/" to="/home"></Redirect>
          </Switch>
          {/* </div> */}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default BaseContent;
