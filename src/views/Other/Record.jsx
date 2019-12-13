import React from "react";
import { connect } from "react-redux";

import ContentTitle from "component/ContentTitle";
import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";

import { Table, Button, message, DatePicker } from "antd";
import moment from "moment";
import { recordUpload as tableCols } from "utils/cols";
import { getRecordUpload as getList, getTeacher } from "store/async";
import { HomeState as BaseState } from "utils/extends";

const { RangePicker } = DatePicker;

@connect(
  state => ({
    teachers: state.select.teachers,
    ...state.record.upload
  }),
  { getList, getTeacher }
)
class Record extends BaseState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.state.configType = [
      {
        value: "student_import",
        label: "学生上传"
      },
      {
        value: "course_import",
        label: "课程上传"
      },
      {
        value: "exam_result_import",
        label: "成绩上传"
      }
    ];
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
  setParams = (key, value, cb) => {
    this.setState(
      {
        search_params: {
          ...this.state.search_params,
          [key]: value
        }
      },
      cb
    );
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
  changeRange = time => {
    console.log(time);
    const timeZone = "YYYY-MM-DD 00:00:00";
    this.setParams("start_at", time[0].format(timeZone), () => {
      this.setParams("end_at", time[1].format(timeZone));
    });
  };

  render() {
    const { scroll, search_params, loading } = this.state;
    const { lists, page, teachers } = this.props;
    return (
      <div ref="need">
        <ContentTitle title={"上传记录"} />
        <div className="content-search">
          <BaseSelect
            style={{}}
            placeholder="上传"
            setParams={this.setParams}
            config={{
              key: "type",
              value: search_params.type
            }}
            options={this.state.configType}
            isMore
          ></BaseSelect>
          <BaseSelect
            placeholder="教师"
            setParams={this.setParams}
            config={{
              key: "teacher_id",
              value: search_params.teacher_id,
              listKey: "teachers",
              listType: "getTeacher"
            }}
            options={teachers.lists}
            getMore={this.getMoreList}
          />
          <div className="ml20">
            <RangePicker
              value={[
                search_params.start_at ? moment(search_params.start_at) : null,
                search_params.end_at ? moment(search_params.end_at) : null
              ]}
              onChange={this.changeRange}
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
          rowKey="id"
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

export default Record;
