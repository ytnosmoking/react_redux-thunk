import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import SiderMenu from "./SiderMenu";
import BaseHead from "./BaseHead";
import BaseContent from "./BaseContent";
import BaseBread from "./BaseBread";
import SchoolTips from "./BaseTips";
import { createAction } from "utils/tools";
import * as ACTION from "../store/async/action_type";
import "./dashboard.less";
const { Header, Sider, Content } = Layout;
@connect(
  (state) => ({
    historyRoutes: state.history,
  }),
  { logout: createAction(ACTION.LOGOUT) }
)
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSide: true,
    };
  }
  exitSys = () => {
    this.props.logout();
    this.props.history.push({ pathname: "/login" });
  };
  toggle = () => {
    this.setState({
      showSide: !this.state.showSide,
    });
  };
  render() {
    console.log(`--------------this is DashBoard--------------`);
    return (
      <Layout className="baseLayout">
        <Sider
          collapsed={!this.state.showSide}
          style={{
            overflow: "auto",
          }}
          width="220"
        >
          <SiderMenu></SiderMenu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <BaseHead
              isChecked={this.state.showSide}
              toggle={this.toggle}
              exitSys={this.exitSys}
            ></BaseHead>
          </Header>
          <Content style={{ position: "relative" }}>
            <BaseBread></BaseBread>
            <BaseContent></BaseContent>
            <SchoolTips></SchoolTips>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DashBoard;
