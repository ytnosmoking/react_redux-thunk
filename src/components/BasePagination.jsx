import React, { Component } from "react";
import { Pagination } from "antd";

class BasePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changePage = page => {
    const { params, getList } = this.props;
    getList({ ...params, page });
  };
  changePageSize = (page, page_size) => {
    const { params, getList } = this.props;
    getList({ ...params, page, page_size });
  };
  render() {
    const { page } = this.props;
    return (
      <div style={{ textAlign: "right", padding: "80px 0 0 0" }}>
        <Pagination
          total={page.total}
          current={page.page}
          showSizeChanger
          showQuickJumper
          onChange={this.changePage}
          onShowSizeChange={this.changePageSize}
        />
      </div>
    );
  }
}

export default BasePagination;
