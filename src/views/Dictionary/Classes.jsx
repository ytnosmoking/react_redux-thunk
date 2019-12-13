import React from "react";

import { connect } from "react-redux";

import ContentTitle from "component/ContentTitle";
import BaseSelect from "component/BaseSelect";
import BasePagination from "component/BasePagination";

import { Table, Button, message, Input } from "antd";
import { dicClasses, operation } from "utils/cols";
import { getDicClasses as getList, getMajors } from "store/async";
import { HomeState as BaseState } from "utils/extends";

@connect(
  state => ({
    majors: state.select.majors,
    ...state.dictionary.classes
  }),
  { getList, getMajors }
)
class Classes extends BaseState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.tableCols = [
      ...dicClasses,
      operation({
        width: 100,
        fixed: "right",
        render: (txt, record) => {
          return <Button icon="edit"></Button>;
        }
      })
    ];
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
    console.log(this);
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page, majors } = this.props;
    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || ""}
          btn={<Button type="primary">新增</Button>}
        />
        <div className="content-search">
          <BaseSelect
            style={{}}
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
              placeholder="班级"
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
          rowKey="id"
          loading={loading}
          scroll={scroll}
          dataSource={lists}
          size="small"
          pagination={false}
          bordered
          columns={this.tableCols}
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

export default Classes;
