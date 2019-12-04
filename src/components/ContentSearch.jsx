import React, { Component } from "react";
import { DatePicker, Button, message, Input } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import CommonSelect from "component/CommonSelect";
import { getMajors } from "store/async";
@connect(
  state => ({
    majors: state.select.majors
  }),
  { getMajors }
)
class ContentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openYear: false,
      enter_year: null, // 入学年份
      major_id: "", // 专业
      name: "", // 姓名
      student_no: "" // 学号
    };
  }
  // year
  openChangeYear = status => {
    console.log(status);
    this.setState({ openYear: !!status });
  };
  changeYear = v => {
    this.setState(
      {
        enter_year: v,
        openYear: false
      },
      () => {
        this.props.setParams({
          enter_year: v ? moment(v).format("YYYY") : null
        });
      }
    );
  };
  clearYear = () => {
    this.setState({
      enter_year: null
    });
  };
  //  专业
  getMoreMajors = () => {
    const {
      majors: { lists, page: pageInfo }
    } = this.props;
    if (lists.length >= pageInfo.total) {
      return message.info("没有数据了");
    }
    const page = (pageInfo.page || 0) + 1;
    this.props.getMajors({ page });
  };
  changeMajor = major_id => {
    console.log(major_id);
    this.setState(
      {
        major_id
      },
      () => {
        this.props.setParams({ major_id });
      }
    );
  };
  // 学号
  changeNo = e => {
    this.setState({
      student_no: e.target.value
    });
  };
  // 姓名
  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };
  //  确定
  confirm = () => {
    let params = {};
    params.enter_year = this.state.enter_year
      ? moment(this.state.enter_year).format("YYYY")
      : null;
    params.major_id = this.state.major_id;
    params.name = this.state.name;
    params.student_no = this.state.student_no;

    this.props.confirm(params);
  };
  //  clear all 重置
  clearAll = () => {
    const params = {
      enter_year: null,
      major_id: "",
      name: "",
      student_no: ""
    };
    this.setState({ ...params, openYear: false }, () => {
      this.props.confirm(params);
    });
  };

  render() {
    const { majors, hasYear, hasMajor, hasName, hasNo } = this.props;

    console.log(this.props);
    return (
      <div className="content-search">
        {/* enter_year */}
        {hasYear ? (
          <DatePicker
            allowClear
            value={this.state.enter_year}
            open={this.state.openYear}
            mode="year"
            placeholder="请选择年份"
            format="YYYY"
            onOpenChange={this.openChangeYear}
            onPanelChange={this.changeYear}
            onChange={this.clearYear}
          />
        ) : (
          ""
        )}
        {/* major_id */}
        {hasMajor ? (
          <CommonSelect
            getMore={this.getMoreMajors}
            selectValue={this.state.major_id}
            changeOption={this.changeMajor}
            options={majors.lists}
          />
        ) : (
          ""
        )}
        {/* name */}
        {hasName ? (
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="姓名"
              value={this.state.name}
              onChange={this.changeName}
            />
          </div>
        ) : (
          ""
        )}
        {/* student_no */}
        {hasNo ? (
          <div className="ml20 w160">
            <Input
              allowClear
              placeholder="学号"
              value={this.state.student_no}
              onChange={this.changeNo}
            />
          </div>
        ) : (
          ""
        )}

        <Button className="ml20" type="primary" onClick={this.confirm}>
          确认
        </Button>
        <Button className="ml20" type="primary" onClick={this.clearAll}>
          重置
        </Button>
      </div>
    );
  }
}

export default ContentSearch;
