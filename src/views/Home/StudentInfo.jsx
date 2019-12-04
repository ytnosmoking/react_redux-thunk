import React, { Component } from "react";
import ContentTitle from "component/ContentTitle";
import { Table } from "antd";
import { connect } from "react-redux";
import { HomeStudentInfoCols as tableCols } from "utils/cols";
import { getHomeStudentInfo as getList } from "store/async";
import BasePagination from "component/BasePagination";
import { BaseState } from "utils/extends";

@connect(
  state => ({
    ...state.home.studentInfo
  }),
  { getList }
)
class StudentInfo extends BaseState {
  constructor(props) {
    super(props);
    this.state.loading = true;
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
    const {
      query: { id: student_id }
    } = this.props.location.state;
    this.props.getList({ page, page_size, ...params, student_id });
  };

  render() {
    const { state } = this.props.location;
    const {
      query: { name, student_no }
    } = state;
    const { scroll, serach_params, loading } = this.state;
    const { lists, page } = this.props;
    console.log(this.props);
    return (
      <div
        ref="need"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          left: 0,
          top: 0,
          backgroundColor: "#fff",
          padding: "40px 20px",
          zIndex: 1
        }}
        className="animated slideInRight"
      >
        <ContentTitle
          title={(state && state.title) || ""}
          txt={<div style={{ fontSize: 20 }}>{name + "-" + student_no}</div>}
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

export default StudentInfo;
