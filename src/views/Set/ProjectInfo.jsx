import React from "react";
import ContentTitle from "component/ContentTitle";
import { Table, Button } from "antd";
import { connect } from "react-redux";
import { setProjectInfoCols, operation } from "utils/cols";
import { getSetProjectInfo as getList } from "store/async";
import BasePagination from "component/BasePagination";
import { HomeState } from "utils/extends";

@connect(
  state => ({
    ...state.set.projectInfo
  }),
  { getList }
)
class ProjectInfo extends HomeState {
  constructor(props) {
    super(props);

    this.state.loading = true;
    this.tableCols = [
      ...setProjectInfoCols,
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
    const { page, page_size } = this.props.page;
    this.setState({
      loading: true
    });
    const { major_id, enter_year } = this.props.location.state;
    this.props.getList({ page, page_size, ...params, major_id, enter_year });
  };

  render() {
    const { state } = this.props.location;

    const { scroll, serach_params, loading } = this.state;
    const { lists, page } = this.props;
    console.log(this.props);
    return (
      <div ref="need" className="secondDiv animated slideInRight">
        <ContentTitle
          title={(state && state.title) || ""}
          btn={<Button type="primary">新增</Button>}
        />
        <Table
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            maxHeight: scroll.y + "px"
            // minHeight: scroll.y + "px"
          }}
          loading={loading}
          scroll={scroll}
          dataSource={lists}
          size="middle"
          pagination={false}
          bordered
          columns={this.tableCols}
        ></Table>
        <BasePagination
          page={page}
          params={serach_params}
          getList={this.getList}
        />
      </div>
    );
  }
}

export default ProjectInfo;
