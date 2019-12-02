import React, { Component } from "react";
import { Button, Layout } from "antd";
import { HomeRoute } from "router/index";
import { Switch, Route, Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goTo = () => {
    this.props.history.push({ pathname: "/child" });
  };
  render() {
    console.log(`%c--------------THIS IS HOME--------------`, "color:red");
    console.log(this);
    const { path: match } = this.props.match;
    return (
      <div style={{ backgroundColor: "orange" }}>
        this is Home
        <hr />
        <Button type="info" onClick={this.goTo}>
          GO TO CHILD
        </Button>
        <hr />
        <Switch>
          {HomeRoute.children.map(route => (
            <Route
              exact
              path={route.pathname}
              key={route.pathname}
              component={route.component}
            ></Route>
          ))}
          <Redirect from={match} to={HomeRoute.redirect}></Redirect>
        </Switch>
      </div>
    );
  }
}

export default Home;
