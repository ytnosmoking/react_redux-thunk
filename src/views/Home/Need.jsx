import React from "react";
import { connect } from "react-redux";

import ContentTitle from "component/ContentTitle";
import YearPicker from "component/Picker";
import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";
import { Table, Button, message } from "antd";
import { HomeNeedCols } from "utils/cols";
import { getHomeNeed as getList, getMajors } from "store/async";
import { HomeState } from "utils/extends";

@connect(
  (state, ownProps) => {
    console.log(ownProps);
    return { majors: state.select.majors, ...state.home.need };
  },
  { getList, getMajors }
)
class HomeNeed extends HomeState {
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
  setParams = (key, value) => {
    this.setState({
      search_params: {
        ...this.state.search_params,
        [key]: value
      }
    });
  };

  getMoreList = (key, type) => {
    const {
      [key]: { lists, page: pageInfo }
    } = this.props;
    if (lists.length >= pageInfo.total) {
      return message.info("没有数据了");
    }
    const page = (pageInfo.page || 0) + 1;
    this.props[type]({ page });
  };
  render() {
    const { state } = this.props.location;
    const { scroll, search_params } = this.state;
    const { lists, page, majors } = this.props;

    return (
      <div ref="need">
        <ContentTitle title={(state && state.title) || "达成度统计-毕业要求"} />
        <div className="content-search">
          <YearPicker
            setParams={this.setParams}
            config={{ key: "enter_year", value: search_params.enter_year }}
            mode="year"
            format="YYYY"
            placeholder="请选择年份"
          />
          <BaseSelect
            setParams={this.setParams}
            config={{
              key: "major_id",
              value: search_params.major_id,
              listKey: "majors",
              listType: "getMajors"
            }}
            options={majors.lists}
            getMore={this.getMoreList}
          />
          <Button className="ml20" type="primary" onClick={this.confirm}>
            确认
          </Button>
          <Button className="ml20" type="primary" onClick={this.reset}>
            重置
          </Button>
        </div>
        {/* table */}
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
        {/* pagination */}
        <BasePagination
          page={page}
          params={search_params}
          getList={this.getList}
        />
      </div>
    );
  }
}

export default HomeNeed;
