import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import ContentTitle from "component/ContentTitle";
import YearPicker from "component/Picker";
import BaseSelect from "component/BaseSelect";
import TargetInfo from "./TargetInfo";

import BasePagination from "component/BasePagination";
import { Table, Button, message, Input } from "antd";
import { courseTargetCols, operation } from "utils/cols";
import { HomeState } from "utils/extends";
import { getCourseTarget as getList, getMajors, getTeacher } from "store/async";

const tableCols = [
  ...courseTargetCols,
  operation({
    width: 200,
    fixed: "right",
    render: (txt, record) => {
      return (
        <Button style={{ width: "100%" }} type="primary" size="small">
          <Link
            to={{
              pathname: `/course/target/${record.key}`,
              state: {
                title: "课程达成度",
                h3: record.course
              }
            }}
          >
            课程目标
          </Link>
        </Button>
      );
    }
  })
];

@connect(
  state => ({
    majors: state.select.majors,
    ...state.course.target,
    lists: state.course.target.lists.map(list => {
      const { average_achivement: score, id: key, training_plan } = list;
      const {
        term: terms,
        enter_year,
        major,
        course,
        teachers
      } = training_plan;
      return {
        key,
        score,
        enter_year,
        terms: terms.title,
        major: major.title,
        course_no: course.course_no,
        course: course.title,
        teacher: teachers.join(",")
      };
    }),

    teacher: state.select.teachers
  }),
  {
    getList,
    getMajors,
    getTeacher
  }
)
class Target extends HomeState {
  constructor(props) {
    super(props);
    console.log(this);
    console.log(this.props);
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

    this.props.getList({
      page,
      page_size,
      ...params
    });
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
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="课程编号"
              value={search_params.course_no}
              onChange={e => this.setParams("course_no", e.target.value)}
            />
          </div>
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="课程名称"
              value={search_params.title}
              onChange={e => this.setParams("title", e.target.value)}
            />
          </div>
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
        <Route
          path={`${this.props.match.path}/:id`}
          component={TargetInfo}
        ></Route>
      </div>
    );
  }
}

export default Target;
