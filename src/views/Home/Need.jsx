import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import ContentSearch from "component/ContentSearch";
import BasePagination from "component/BasePagination";
import { Table } from "antd";
import { HomeNeedCols } from "utils/cols";
import { getHomeNeed as getList } from "store/async";
import { BaseState } from "utils/extends";

@connect(
  state => ({
    ...state.home.need
  }),
  { getList }
)
class HomeNeed extends BaseState {
  componentDidMount() {
    const dom = this.refs.need;
    const ycal = dom.clientHeight * 0.6;
    this.setState({
      scroll: {
        x: this.state.scroll.x,
        y: ycal
      }
    });
    this.getList();
  }
  getList = params => {
    const { page, page_size } = this.props.page;
    this.props.getList({ page, page_size, ...params });
  };

  render() {
    const { state } = this.props.location;
    const { scroll, serach_params } = this.state;
    const { lists, page } = this.props;
    return (
      <div ref="need">
        <ContentTitle title={(state && state.title) || "达成度统计-毕业要求"} />
        <ContentSearch
          confirm={this.confirm}
          hasYear
          hasMajor
          setParams={this.setParams}
        />
        <Table
          style={{
            backgroundColor: "#fff",
            maxHeight: scroll.y + "px"
            // minHeight: scroll.y + "px"
          }}
          scroll={scroll}
          dataSource={lists}
          size="middle"
          pagination={false}
          bordered
          columns={HomeNeedCols}
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

export default HomeNeed;
