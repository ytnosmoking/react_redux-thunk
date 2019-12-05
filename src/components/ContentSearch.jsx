import React, { Component } from "react";
import { DatePicker, Button, message, Input } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import CommonSelect from "component/CommonSelect";
import {
  getMajors,
  getRequireMents,
  getSupport,
  getDepartment,
  getTeacher
} from "store/async";
@connect(
  state => ({
    majors: state.select.majors,
    requireMents: state.select.requireMents.map(item => ({
      value: item.id,
      label: `要求${item.number}`
    })),
    supportHead: state.select.supportHead.reduce((pre, next) => {
      const { number, explains } = next;
      if (explains.length) {
        return [
          ...pre,
          ...explains.map(item => ({
            value: item.id,
            label: `${number}.${item.number}`
          }))
        ];
      }
      return pre;
    }, []),
    department: state.select.departments,
    teacher: state.select.teachers
  }),
  { getMajors, getRequireMents, getSupport, getDepartment, getTeacher }
)
class ContentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openYear: false,
      enter_year: null, // 入学年份
      major_id: "", // 专业
      name: "", // 姓名
      student_no: "", // 学号
      graduate_requirement_id: "", // 要求
      graduate_explain_id: "", // 支撑点
      department_id: "", // 系
      teacher_id: "" // 教师
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
  // 系
  getMoreDepartment = () => {
    const {
      department: { lists, page: pageInfo }
    } = this.props;
    if (lists.length >= pageInfo.total) {
      return message.info("没有数据了");
    }
    const page = (pageInfo.page || 0) + 1;
    this.props.getDepartment({ page });
  };
  changeDepartment = department_id => {
    console.log(department_id);
    this.setState(
      {
        department_id
      },
      () => {
        this.props.setParams({ department_id });
      }
    );
  };
  // 课程组长 老师
  getMoreTeacher = () => {
    const {
      teacher: { lists, page: pageInfo }
    } = this.props;
    if (lists.length >= pageInfo.total) {
      return message.info("没有数据了");
    }
    const page = (pageInfo.page || 0) + 1;
    this.props.getTeacher({ page });
  };
  changeTeacher = teacher_id => {
    console.log(teacher_id);
    this.setState(
      {
        teacher_id
      },
      () => {
        this.props.setParams({ teacher_id });
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
  // 要求
  changeGraduateRequirement = graduate_requirement_id => {
    console.log(graduate_requirement_id);
    this.setState(
      {
        graduate_requirement_id
      },
      () => {
        this.props.setParams({ graduate_requirement_id });
      }
    );
  };
  // 支撑点
  changeGraduateExplain = graduate_explain_id => {
    this.setState(
      {
        graduate_explain_id
      },
      () => {
        this.props.setParams({ graduate_explain_id });
      }
    );
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
    params.graduate_requirement_id = this.state.graduate_requirement_id;
    params.graduate_explain_id = this.state.graduate_explain_id;
    params.graduate_explain_id = this.state.graduate_explain_id;
    params.department_id = this.state.department_id;
    params.teacher_id = this.state.teacher_id;

    this.props.confirm(params);
  };
  //  clear all 重置
  clearAll = () => {
    const params = {
      enter_year: null,
      major_id: "",
      name: "",
      student_no: "",
      graduate_requirement_id: "",
      graduate_explain_id: "",
      department_id: "",
      teacher_id: ""
    };
    this.setState({ ...params, openYear: false }, () => {
      this.props.confirm(params);
    });
  };

  componentWillUpdate(nextProps, nextState) {
    // console.log(`nextState`);
    // console.log(nextState);
    const { enter_year: nextYear, major_id: nextMajor } = nextState;
    const { enter_year, major_id } = this.state;
    if (
      nextYear &&
      nextMajor &&
      (nextYear !== enter_year || nextMajor !== major_id)
    ) {
      const params = {
        enter_year: moment(nextYear).format("YYYY"),
        major_id: nextMajor
      };
      this.props.getSupport(params);
      this.setState({
        graduate_explain_id: ""
      });
      console.log(`----------------support------------------------`);
    }
  }

  componentDidMount() {
    const { hasRequire, requireMents } = this.props;
    if (hasRequire && requireMents.length === 0) {
      this.props.getRequireMents();
    }
  }

  render() {
    const {
      // 数据
      majors,
      requireMents,
      supportHead,
      department,
      teacher,
      // 状态
      hasYear,
      hasMajor,
      hasName,
      hasNo,
      hasRequire,
      hasSupport,
      hasDepartment,
      hasLeader
    } = this.props;

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
        {/* 需求 */}
        {hasRequire ? (
          <CommonSelect
            placeholder="要求"
            noMore
            selectValue={this.state.graduate_requirement_id}
            changeOption={this.changeGraduateRequirement}
            options={requireMents}
          />
        ) : (
          ""
        )}
        {/* 支撑点 */}
        {hasSupport ? (
          <CommonSelect
            placeholder="支撑点"
            disabled={!(this.state.enter_year && this.state.major_id)}
            noMore
            selectValue={this.state.graduate_explain_id}
            changeOption={this.changeGraduateExplain}
            options={supportHead}
          />
        ) : (
          ""
        )}
        {/* department_id */}
        {hasDepartment ? (
          <CommonSelect
            placeholder="系"
            getMore={this.getMoreDepartment}
            selectValue={this.state.department_id}
            changeOption={this.changeDepartment}
            options={department.lists}
          />
        ) : (
          ""
        )}
        {/* teacher_id */}
        {hasLeader ? (
          <CommonSelect
            placeholder="课程组长"
            getMore={this.getMoreTeacher}
            selectValue={this.state.teacher_id}
            changeOption={this.changeTeacher}
            options={teacher.lists}
          />
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
