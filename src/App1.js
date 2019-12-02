import React, { Component } from 'react';

import Login from 'views/Login'

import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from "store/actions/login";
import { Layout, Menu, Icon, Button } from "antd";
import { navRoutes } from "./router/index";

import './App.css'
import DashBoard from 'component/DashBoard'
const { Header, Sider, Content } = Layout

@connect(
  state => ({
    isLogin: state.all.isLogin
  }),
  { logout })
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goToLogin = () => {
    console.log(this.props);
    this.props.logout();
    this.props.history.push({ pathname: "/login" });
  };
  render() {

    const { isLogin } = this.props

    console.log(this)
    const { pathname } = this.props.location
    return (
      <Layout className="baseLayout">

        <Sider className={`${isLogin ? 'slideInLeft' : 'sider-hide slideOutLeft'} animated`} >
          <Menu mode="inline" theme="dark"
            selectedKeys={[pathname]}
          >
            {navRoutes.map(route => (
              <Menu.Item key={route.pathname}>
                <Link to={route.pathname}>
                  <Icon type={route.meta.icon} />
                  <span>{route.meta.title}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout >
          <Header className={`${isLogin ? 'slideInRight' : 'slideOutRight header-hide'} animated header`} >
            <h1 className="color-f">this is Header</h1>
            <Button type="primary" onClick={this.goToLogin}> this is go to Login</Button>
          </Header>
          <Content >
            <Switch>

              {navRoutes.map(route => (
                <Route
                  exact
                  path={route.pathname}
                  key={route.pathname}
                  component={route.component}
                ></Route>
              ))}
              <Route exact path='/login' component={Login}></Route>
              <Redirect from="*" to="/home"></Redirect>
            </Switch>

          </Content>

        </Layout>
      </Layout >
    );
  }
}
// export default App;


function BaseRoute() {
  return (
    <Switch>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/' component={DashBoard}></Route>
      <Redirect from="*" to="/"></Redirect>
    </Switch>
  )
}





export default BaseRoute;

