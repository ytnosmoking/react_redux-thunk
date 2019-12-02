import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import { navRoutes } from "../router/index";
@withRouter
class BaseBread extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      state: { title },
      pathname
    } = this.props.location;
    const matchArr =
      navRoutes.filter(route => pathname.includes(route.pathname)) || [];
    const matchTitle = (matchArr.length && matchArr[0].meta.title) || "";
    return (
      <div className="baseBread">
        <Breadcrumb>
          {matchTitle ? <Breadcrumb.Item>{matchTitle}</Breadcrumb.Item> : ""}
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

export default BaseBread;
