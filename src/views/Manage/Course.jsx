import React from "react";

import { connect } from "react-redux";

import ContentTitle from "component/ContentTitle";

import BasePagination from "component/BasePagination";

import { Table, Button } from "antd";
import { manageCourse, operation } from "utils/cols";
import { getManageCourse as getList } from "store/async";
import { HomeState as BaseState } from "utils/extends";

@connect(
  state => ({
    ...state.manage.courses
  }),
  { getList }
)
class Courses extends BaseState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.tableCols = [
      ...manageCourse,
      operation({
        width: 100,
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

  render() {
    console.log(this);
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page } = this.props;
    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || ""}
          btn={
            <div>
              <Button type="primary">批量导入</Button>
              <Button type="primary" className="ml20">
                新增
              </Button>
            </div>
          }
        />

        <Table
          style={{
            marginTop: 20,
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

export default Courses;
