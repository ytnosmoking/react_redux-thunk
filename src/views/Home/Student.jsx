import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import ContentSearch from "component/ContentSearch";
import BasePagination from "component/BasePagination";
import StudentInfo from "./StudentInfo";
import { Table, Button } from "antd";
import { HomeStudentCols, operation } from "utils/cols";
import { getHomeStudent as getList } from "store/async";
import { BaseState } from "utils/extends";

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
    ...state.home.student
  }),
  { getList }
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
  render() {
    console.log(this);
    const { state } = this.props.location;
    const { scroll, serach_params, loading } = this.state;
    const { lists, page } = this.props;
    return (
      <div ref="need">
        <ContentTitle title={(state && state.title) || ""} />
        <ContentSearch
          confirm={this.confirm}
          hasYear
          hasMajor
          hasName
          hasNo
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
        {/* <Transition>
          <CSSTransition in={true} timeout={2000} classNames="slideBackRight"> */}
        <Route
          path={`${this.props.match.path}/:id`}
          component={StudentInfo}
          classlist="123"
        ></Route>
        {/* </CSSTransition>
        </Transition> */}
      </div>
    );
  }
}

export default Student;
