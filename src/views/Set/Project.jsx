import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import ContentTitle from "component/ContentTitle";
import YearPicker from "component/Picker";
import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";
import ProjectInfo from "./ProjectInfo";

import { Table, Button, message } from "antd";
import { setProjectCols, operation } from "utils/cols";
import { getSetProject as getList, getMajors } from "store/async";
import { HomeState } from "utils/extends";

@connect(
  state => ({
    majors: state.select.majors,
    ...state.set.project
  }),
  { getList, getMajors }
)
class Project extends HomeState {
  constructor(props) {
    super(props);
    this.tableCols = [
      ...setProjectCols,
      operation({
        width: 200,
        render: (txt, record) => (
          <div>
            <Button type="primary">
              <Link
                to={{
                  pathname: `${this.props.match.path}/info`,
                  state: {
                    major_id: record.major.id,
                    enter_year: record.enter_year,
                    title: `专业培养方案————${record.enter_year +
                      record.major.title}`
                  }
                }}
              >
                培养方案
              </Link>
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
        x: dom.clientWidth - 40,
        y: ycal
      }
    });
    this.getList();
  }
  getList = params => {
    const { page, page_size } = this.props.page;
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
    const { scroll, search_params } = this.state;
    const { lists, page, majors } = this.props;

    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || "达成度统计-毕业要求"}
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
          }}
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
          component={ProjectInfo}
        ></Route>
      </div>
    );
  }
}

export default Project;
