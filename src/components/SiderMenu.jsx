import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { navRoutes } from "../router/index";
import { Link, withRouter } from "react-router-dom";
const { SubMenu } = Menu;

const RouteItem = route => (
  <Link to={{ pathname: route.pathname, state: { title: route.meta.title } }}>
    {route.meta.icon ? <Icon type={route.meta.icon} /> : ""}
    <span>{route.meta.title}</span>
  </Link>
);

@withRouter
class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pathname } = this.props.location;
    console.log(this.props);
    return (
      <Menu mode="inline" theme="dark" selectedKeys={[pathname]}>
        {navRoutes.map(route => {
          if (route.children) {
            return (
              <SubMenu
                key={route.pathname}
                title={
                  <span>
                    {route.meta.icon ? <Icon type={route.meta.icon} /> : ""}
                    <span>{route.meta.title}</span>
                  </span>
                }
              >
                {route.children.map(sonRoute => (
                  <Menu.Item key={sonRoute.pathname}>
                    <RouteItem {...sonRoute}></RouteItem>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={route.pathname}>
              <RouteItem {...route}></RouteItem>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default SiderMenu;
