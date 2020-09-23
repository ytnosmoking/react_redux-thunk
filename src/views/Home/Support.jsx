import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import YearPicker from "component/Picker";
import BaseSelect from "component/BaseSelect";

import BasePagination from "component/BasePagination";
import { Table, Button, message } from "antd";
import { HomeSupportCols as tableCols } from "utils/cols";
import {
  getHomeSupport as getList,
  getMajors,
  getRequireMents,
  getSupport,
} from "store/async";
import { HomeState } from "utils/extends";

@connect(
  (state) => ({
    // 专业
    majors: state.select.majors,
    // 要求
    requireMents: state.select.requireMents.map((item) => ({
      value: item.id,
      label: `要求${item.number}`,
    })),
    // 支撑点
    supportHead: state.select.supportHead.reduce((pre, next) => {
      const { number, explains } = next;
      if (explains.length) {
        return [
          ...pre,
          ...explains.map((item) => ({
            value: item.id,
            label: `${number}.${item.number}`,
          })),
        ];
      }
      return pre;
    }, []),
    ...state.home.support,
  }),
  { getList, getMajors, getRequireMents, getSupport }
)
class Support extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
  }
  componentDidMount() {
    const dom = this.refs.need;
    const ycal = dom.clientHeight * 0.6;
    this.setState({
      scroll: {
        x: true,
        y: ycal,
      },
    });
    this.getList();
    const { requireMents } = this.props;
    if (requireMents.length === 0) {
      this.props.getRequireMents();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false,
    });
  }
  getList = (params) => {
    const { page, page_size } = this.props.page;
    this.setState({
      loading: true,
    });
    this.props.getList({ page, page_size, ...params });
  };

  setParams = (key, value) => {
    this.setState(
      {
        search_params: {
          ...this.state.search_params,
          [key]: value,
        },
      },
      () => {
        const { search_params } = this.state;
        const keys = ["enter_year", "major_id"];
        if (keys.includes(key) && keys.every((item) => search_params[item])) {
          const params = {};
          keys.forEach((item) => {
            params[item] = search_params[item];
          });
          this.props.getSupport(params);
        }
      }
    );
  };
  getMoreList = (key, type) => {
    console.log(key);
    if (key === "requireMents" || key === "supportHead") {
      const length = this.props[key].length;
      if (!length) {
        return this.props[type]();
      }
      return message.info("没有数据了");
    } else {
      const {
        [key]: { lists, page: pageInfo },
      } = this.props;
      if (lists.length >= pageInfo.total) {
        return message.info("没有数据了");
      }
      const page = (pageInfo.page || 0) + 1;
      this.props[type]({ page });
    }
  };

  render() {
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page, majors, requireMents, supportHead } = this.props;
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
              listType: "getMajors",
            }}
            options={majors.lists}
            getMore={this.getMoreList}
          />
          {/* 要求  */}
          <BaseSelect
            placeholder="要求"
            setParams={this.setParams}
            config={{
              key: "graduate_requirement_id",
              value: search_params.graduate_requirement_id,
              listKey: "requireMents",
              listType: "getRequireMents",
            }}
            isMore
            options={requireMents}
            getMore={this.getMoreList}
          />
          {/* 支撑点 */}
          <BaseSelect
            placeholder="支撑点"
            setParams={this.setParams}
            disabled={!(search_params.enter_year && search_params.major_id)}
            config={{
              key: "graduate_explain_id",
              value: search_params.graduate_explain_id,
              listKey: "supportHead",
              listType: "getSupport",
            }}
            isMore
            options={supportHead}
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
            maxHeight: scroll.y + "px",
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
      </div>
    );
  }
}

export default Support;
