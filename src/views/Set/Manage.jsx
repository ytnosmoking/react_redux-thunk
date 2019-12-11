import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import ContentTitle from "component/ContentTitle";

import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";
import TableInfo from "./TableInfo";

import { Table, Button, message } from "antd";
import { setManage, operation } from "utils/cols";
import {
  getSetManage as getList,
  getDepartment,
  getTeacher
} from "store/async";
import { HomeState } from "utils/extends";

@connect(
  state => ({
    teacher: state.select.teachers,
    departments: state.select.departments,
    ...state.set.manage
  }),
  { getList, getDepartment, getTeacher }
)
class Manage extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.tableCols = [
      ...setManage,
      operation({
        width: 100,
        fixed: "right",
        render: (txt, record) => <Button icon="edit"></Button>
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
        title: `实现矩阵详表详情`,
        ...record
      }
    });
    console.log(record);
  }
  render() {
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page, teacher, departments } = this.props;

    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || ""}
          btn={<Button type="primary">新增</Button>}
        />
        <div className="content-search">
          <BaseSelect
            placeholder="系"
            setParams={this.setParams}
            style={{}}
            config={{
              key: "department_id",
              value: search_params.department_id,
              listKey: "departments",
              listType: "getDepartment"
            }}
            options={departments.lists}
            getMore={this.getMoreList}
          />

          <BaseSelect
            placeholder="课程组长"
            setParams={this.setParams}
            config={{
              key: "teacher_id",
              value: search_params.teacher_id,
              listKey: "teacher",
              listType: "getTeacher"
            }}
            options={teacher.lists}
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
          component={TableInfo}
        ></Route>
      </div>
    );
  }
}

export default Manage;
