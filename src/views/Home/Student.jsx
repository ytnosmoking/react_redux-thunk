import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import ContentTitle from "component/ContentTitle";
import YearPicker from "component/Picker";
import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";
import StudentInfo from "./StudentInfo";
import { Table, Button, message, Input } from "antd";
import { HomeStudentCols, operation } from "utils/cols";
import { getHomeStudent as getList, getMajors } from "store/async";
import { HomeState as BaseState } from "utils/extends";

const tableCols = [
  ...HomeStudentCols,
  {
    ...operation({ width: 220, fixed: "right" }),
    render: (txt, record) => {
      return (
        <div>
          <Button type="primary" style={{ marginRight: 20 }}>
            <Link
              to={{
                pathname: `/home/student/${record.id}`,
                state: {
                  title: "学生达成度详情",
                  query: {
                    id: record.id,
                    enter_year: record.enter_year,
                    major: (record.major && record.major.id) || "",
                    name: record.name,
                    student_no: record.student_no
                  }
                }
              }}
            >
              达成度详情
            </Link>
          </Button>
          <Button type="primary">雷达图</Button>
        </div>
      );
    }
  }
];

@connect(
  state => ({
    majors: state.select.majors,
    ...state.home.student
  }),
  { getList, getMajors }
)
class Student extends BaseState {
  constructor(props) {
    super(props);
    this.state.loading = true;
  }
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
    console.log(this);
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page, majors } = this.props;
    return (
      <div ref="need">
        <ContentTitle title={(state && state.title) || ""} />
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
          {/* name */}
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="姓名"
              value={search_params.name}
              onChange={e => this.setParams("name", e.target.value)}
            />
          </div>
          {/* student_no */}
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="学号"
              value={search_params.student_no}
              onChange={e => this.setParams("student_no", e.target.value)}
            />
          </div>

          <Button className="ml20" type="primary" onClick={this.confirm}>
            确认
          </Button>
          <Button className="ml20" type="primary" onClick={this.reset}>
            重置
          </Button>
        </div>
        {/* <ContentSearch
          confirm={this.confirm}
          hasYear
          hasMajor
          hasName
          hasNo
          setParams={this.setParams}
        /> */}
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
          params={search_params}
          getList={this.getList}
        />

        <Route
          path={`${this.props.match.path}/:id`}
          component={StudentInfo}
          classlist="123"
        ></Route>
      </div>
    );
  }
}

export default Student;
