import React from "react";
import ContentTitle from "component/ContentTitle";
import { Divider } from "antd";
import { HomeState } from "utils/extends";
class ManageSet extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
  }
  componentDidMount() {
    const dom = this.refs.need;
    const ycal = dom.clientHeight * 0.6;
    this.setState({
      scroll: {
        x: 1600,
        y: ycal
      }
    });
    // this.getList();
  }
  render() {
    const { state } = this.props.location;
    // const { scroll, search_params, loading } = this.state;
    // const { lists, page } = this.props;
    return (
      <div ref="need" className="secondDiv animated slideInRight">
        <ContentTitle
          title={
            <div>
              {state && state.title}
              &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: 14, fontWeight: "normal" }}>
                注：笔试小题只能支撑强支撑的目标其中一个，课程目标总权重应为1
              </span>
            </div>
          }
        />
        <Divider
          style={{ margin: "10px 0", height: 2, backgroundColor: "#f0f2f5" }}
        />
      </div>
    );
  }
}

export default ManageSet;
