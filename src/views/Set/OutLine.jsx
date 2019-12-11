import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ContentTitle from "component/ContentTitle";
import YearPicker from "component/Picker";
import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";
import OutLineInfo from "./OutLineInfo";

import { Table, Button, message, Input } from "antd";
import { setOutLineCols, operation } from "utils/cols";
import { getSetOutLine as getList, getMajors } from "store/async";
import { HomeState } from "utils/extends";

@connect(
  state => ({
    majors: state.select.majors,
    ...state.set.outLine
  }),
  { getList, getMajors }
)
class OutLine extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.tableCols = [
      ...setOutLineCols,
      operation({
        width: 200,
        fixed: "right",
        render: (txt, record) => (
          <div>
            <Button type="primary" onClick={() => this.goTo(record)}>
              培养方案
            </Button>
            <Button icon="delete" className="ml10"></Button>
          </div>
        )
      })
    ];
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

  goTo(record) {
    if (!record.outline_id) {
      message.error("暂时没有设置课程大纲");
    }
    this.props.history.push({
      pathname: `${this.props.match.path}/info`,
      state: {
        title: `查看课程大纲`,
        ...record
      }
    });
  }
  render() {
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page, majors } = this.props;

    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || ""}
          btn={<Button type="primary">新增</Button>}
        />
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
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="课程名称"
              value={search_params.course_name}
              onChange={e => this.setParams("course_name", e.target.value)}
            />
          </div>
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
          loading={loading}
          rowKey="id"
          scroll={scroll}
          dataSource={lists}
          size="middle"
          pagination={false}
          bordered
          columns={this.tableCols}
        ></Table>
        {/* pagination */}
        <BasePagination
          page={page}
          params={search_params}
          getList={this.getList}
        />

        <Route
          path={`${this.props.match.path}/info`}
          component={OutLineInfo}
        ></Route>
      </div>
    );
  }
}

export default OutLine;
