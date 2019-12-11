import React from "react";
import ContentTitle from "component/ContentTitle";
// import BasePagination from "component/BasePagination";
import { Button } from "antd";
import { HomeState } from "utils/extends";

class TargetInfo extends HomeState {
  constructor(props) {
    super(props);
    this.state.loading = true;
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
    // this.getList();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false
    });
  }
  render() {
    const { state } = this.props.location;
    // const { scroll, search_params, loading } = this.state;
    // const { lists, page } = this.props;
    return (
      <div ref="need" className="secondDiv animated slideInRight">
        <ContentTitle
          title={(state && state.title) || ""}
          txt={<div style={{ fontSize: 20 }}>{state.h3}</div>}
          btn={
            <div>
              <Button type="primary">下载</Button>
            </div>
          }
        />
        {/* <Table
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
          columns={tableCols}
        ></Table> */}
        {/* <BasePagination
          page={page}
          params={search_params}
          getList={this.getList}
        /> */}
      </div>
    );
  }
}

export default TargetInfo;
