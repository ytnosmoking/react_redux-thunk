import React from "react";
import ContentTitle from "component/ContentTitle";
import { Table, Button } from "antd";
import { setNeedCols, operation } from "utils/cols";
import { getRequireMents as getList } from "store/async";
import { HomeState } from "utils/extends";
import { connect } from "react-redux";

@connect(
  state => ({
    lists: state.select.requireMents
  }),
  {
    getList
  }
)
class Need extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.tableCols = [
      ...setNeedCols,
      operation({
        render: (txt, record) => (
          <div>
            <Button icon="edit" onClick={() => this.edit(record)} />
            <Button className="ml10" icon="delete" />
          </div>
        )
      })
    ];
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false
    });
  }
  componentDidMount() {
    const dom = this.refs.need;
    const ycal = dom.clientHeight * 0.7;
    this.setState({
      scroll: {
        x: dom.clientWidth - 40,
        y: ycal
      }
    });
    if (!this.props.lists.length) {
      this.props.getList();
      this.setState({
        loading: true
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }
  edit = item => {
    console.log(item);
  };
  render() {
    const { state } = this.props.location;
    const { scroll, loading } = this.state;
    const { lists } = this.props;
    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || "达成度统计-毕业要求"}
          btn={<Button type="primary">新增</Button>}
        />
        <Table
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            maxHeight: scroll.y + "px"
            // minHeight: scroll.y + "px"
          }}
          rowKey="id"
          loading={loading}
          scroll={scroll}
          dataSource={lists}
          size="middle"
          pagination={false}
          bordered
          columns={this.tableCols}
        ></Table>
      </div>
    );
  }
}

export default Need;
