import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import SiderMenu from "./SiderMenu";
import BaseHead from "./BaseHead";
import BaseContent from "./BaseContent";
import { logout } from "store/actions/login";
import "./dashboard.less";
const { Header, Sider, Content } = Layout;
@connect(
  state => ({
    historyRoutes: state.history
  }),
  { logout }
)
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSide: true
    };
  }
  exitSys = () => {
    this.props.logout();
    this.props.history.push({ pathname: "/login" });
  };
  toggle = () => {
    this.setState({
      showSide: !this.state.showSide
    });
  };
  render() {
    console.log(`--------------this is DashBoard--------------`);
    console.log(this);

    return (
      <Layout className="baseLayout">
        <Sider collapsed={!this.state.showSide}>
          <SiderMenu></SiderMenu>
        </Sider>
        <Layout className="trans">
          <Header style={{ background: "#fff", padding: 0 }}>
            <BaseHead
              isChecked={this.state.showSide}
              toggle={this.toggle}
              exitSys={this.exitSys}
            ></BaseHead>
          </Header>
          <Content>
            <BaseContent></BaseContent>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DashBoard;
