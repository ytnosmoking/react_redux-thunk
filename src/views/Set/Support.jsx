import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import { Link, Route } from "react-router-dom";
import SupportInfo from "./SupportInfo";

import BasePagination from "component/BasePagination";
import { Table, Button } from "antd";
import { setSupportCols, operation } from "utils/cols";
import { getSetSupport as getList } from "store/async";
import { HomeState } from "utils/extends";
@connect(
  state => ({
    ...state.set.support
  }),
  {
    getList
  }
)
class Support extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
    this.tableCols = [
      ...setSupportCols,
      operation({
        fixed: "right",
        width: 200,
        render: (txt, record) => (
          <div>
            <Button icon="edit"></Button>
            <Button icon="delete" className="ml10"></Button>
            <Button type="primary" className="ml10">
              <Link
                to={{
                  pathname: `${this.props.match.path}/${record.key}`,
                  state: {
                    title: "支撑课程",
                    ...record
                  }
                }}
              >
                支撑课程
              </Link>
            </Button>
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

  render() {
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page } = this.props;
    return (
      <div ref="need">
        <ContentTitle
          title={(state && state.title) || ""}
          btn={<Button type="primary">新增</Button>}
        />

        <Table
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            maxHeight: scroll.y + "px"
          }}
          loading={loading}
          scroll={scroll}
          dataSource={lists}
          size="middle"
          pagination={false}
          bordered
          columns={this.tableCols}
        ></Table>
        <BasePagination
          page={page}
          params={search_params}
          getList={this.getList}
        />
        <Route
          path={`${this.props.match.path}/:id`}
          component={SupportInfo}
        ></Route>
      </div>
    );
  }
}

export default Support;
