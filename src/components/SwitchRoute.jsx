import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

function SwitchRoute({ routes }) {
  return (
    <Switch>
      {routes.children.map((route) => (
        <Route
          // exact
          path={route.pathname}
          key={route.pathname}
          component={route.component}
          
        ></Route>
      ))}
      <Redirect from={routes.pathname} to={routes.redirect}></Redirect>
    </Switch>
  );
}
export default SwitchRoute;
