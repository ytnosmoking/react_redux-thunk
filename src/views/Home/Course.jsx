import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import BaseSelect from "component/BaseSelect";
import BasePagination from "component/BasePagination";
import { Table, Button, message } from "antd";
import { HomeCourseCols as tableCols } from "utils/cols";
import {
  getHomeCourse as getList,
  getDepartment,
  getTeacher
} from "store/async";
import { HomeState } from "utils/extends";
@connect(
  state => ({
    department: state.select.departments,
    teacher: state.select.teachers,
    ...state.home.course
  }),
  {
    getList,
    getDepartment,
    getTeacher
  }
)
class Course extends HomeState {
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
    const { scroll, search_params, loading } = this.state;
    const { lists, page, department, teacher } = this.props;
    return (
      <div ref="need">
        <ContentTitle title={(state && state.title) || ""} />
        <div className="content-search">
          <BaseSelect
            style={{}}
            placeholder="系"
            setParams={this.setParams}
            config={{
              key: "department_id",
              value: search_params.department_id,
              listKey: "department",
              listType: "getDepartment"
            }}
            options={department.lists}
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
        <Table
          style={{
            backgroundColor: "#fff",
            maxHeight: scroll.y + "px"
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
          params={search_params}
          getList={this.getList}
        />
      </div>
    );
  }
}

export default Course;
