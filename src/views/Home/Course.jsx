import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import ContentSearch from "component/ContentSearch";
import BasePagination from "component/BasePagination";
import { Table } from "antd";
import { HomeCourseCols as tableCols } from "utils/cols";
import { getHomeCourse as getList } from "store/async";
import { BaseState } from "utils/extends";
@connect(
  state => ({
    ...state.home.course
  }),
  {
    getList
  }
)
class Course extends BaseState {
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
    this.props.getList({ page, page_size, ...params });
  };
  render() {
    const { state } = this.props.location;
    const { scroll, serach_params, loading } = this.state;
    const { lists, page } = this.props;
    return (
      <div ref="need">
        <ContentTitle title={(state && state.title) || ""} />
        <ContentSearch
          hasDepartment
          hasLeader
          confirm={this.confirm}
          setParams={this.setParams}
        />
        <Table
          style={{
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
          columns={tableCols}
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

export default Course;
