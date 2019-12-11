import React from "react";
import ContentTitle from "component/ContentTitle";
import { Table, Button, Tabs } from "antd";
import { connect } from "react-redux";
import { setOutLineInfoCols, operation } from "utils/cols";
import { getSetOutLineInfo as getList } from "store/async";
import { HomeState } from "utils/extends";

const titleInfo = {
  display: "flex",
  alignItems: "center",
  padding: "10px 0 "
};
const { TabPane } = Tabs;
@connect(
  state => ({
    lists: state.set.outLineInfo
  }),
  { getList }
)
class OutLineInfo extends HomeState {
  constructor(props) {
    super(props);

    this.state.loading = true;
    this.tableCols = [
      ...setOutLineInfoCols,
      operation({
        render: (txt, record) => (
          <div>
            <Button icon="edit"></Button>
            <Button icon="form" className="ml20"></Button>
          </div>
        )
      })
    ];
  }
  componentDidMount() {
    const dom = this.refs.need;
    const ycal = dom.clientHeight * 0.8;
    this.setState({
      scroll: {
        x: true,
        y: ycal
      }
    });
    this.getList();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false
    });
  }
  getList = params => {
    this.setState({
      loading: true
    });
    const { id: training_plan_id } = this.props.location.state;
    this.props.getList({ training_plan_id });
  };
  changeTab = key => {
    console.log(key);
    console.log(this.props.location.state);
  };

  render() {
    const { state } = this.props.location;
    const { scroll, loading } = this.state;
    const { lists } = this.props;
    return (
      <div ref="need" className="secondDiv animated slideInRight">
        <ContentTitle title={(state && state.title) || ""} />
        <div style={titleInfo}>
          <div className="ml20">
            <span>入学年份</span>
            <span className="ml20 bold fz-20">{state.enter_year}</span>
          </div>
          <div className="ml20">
            <span>专业</span>
            <span className="ml20 bold fz-20">{state.major}</span>
          </div>
          <div className="ml20">
            <span>课程编号</span>
            <span className="ml20 bold fz-20">{state.course_no}</span>
          </div>
          <div className="ml20">
            <span>课程</span>
            <span className="ml20 bold fz-20">{state.courses}</span>
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="课程目标" key="1">
            <Table
              style={{
                backgroundColor: "#fff",
                maxHeight: scroll.y + "px"
                // minHeight: scroll.y + "px"
              }}
              loading={loading}
              scroll={scroll}
              rowKey="id"
              dataSource={lists}
              size="middle"
              pagination={false}
              bordered
              columns={this.tableCols}
            ></Table>
            <Button type="primary" className="mt10">
              添加
            </Button>
          </TabPane>
          <TabPane tab="课程大纲内容" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default OutLineInfo;
