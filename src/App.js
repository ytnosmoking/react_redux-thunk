import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'



import Login from 'views/Login'
import DashBoard from 'component/DashBoard'




// @withRouter
class BaseRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    console.log(`--------------this is APP--------------`);
    console.log('%c只是个 首页路由页面', "color: white;font-size:20px; font-style: italic; background-color: red;padding: 2px")
    return (

      <Switch >
        <Route exact path='/login' component={Login}></Route>
        <Route component={DashBoard}></Route>
      </Switch>

    )
  }
}



// function BaseRoute() {
//   return (
//     <TransitionGroup>
//       <CSSTransition
//         timeout={5000}
//         classNames={'fade'}
//         key={}
//       >
//         <Switch>
//           <Route exact path='/login' component={Login}></Route>
//           <Route exact path='/' component={DashBoard}></Route>
//           <Redirect from="*" to="/"></Redirect>
//         </Switch>
//       </CSSTransition>
//     </TransitionGroup>
//   )
// }





export default BaseRoute;

