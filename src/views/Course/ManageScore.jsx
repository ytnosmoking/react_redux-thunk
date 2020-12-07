import React from "react";
import { connect } from "react-redux";
import ContentTitle from "component/ContentTitle";
import BasePagination from "component/BasePagination";
import { Table, Button } from "antd";
import { courseManageScoreCols as tableCols } from "utils/cols";
import { HomeState } from "utils/extends";
import { getCourseManageScore as getList } from "store/async";
@connect(
  state => ({
    lists: state.course.manageScore.lists.map((list, index) => {
      const {
        student: { class: classes, id, name, student_no }
      } = list;
      return {
        key: id,
        class: classes,
        name,
        student_no
      };
    }),
    page: state.course.manageScore.page
  }),
  {
    getList
  }
)
class ManageScore extends HomeState {
  constructor(props) {
    super(props);
    console.log(this);
    console.log(this.props);
    this.state.loading = true;
    this.state.training_plan_id = this.props.location.state.id;
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

    this.props.getList({
      page,
      page_size,
      ...params,
      training_plan_id: this.state.training_plan_id
    });
  };
  render() {
    const { state } = this.props.location;
    const { scroll, search_params, loading } = this.state;
    const { lists, page } = this.props;

    return (
      <div ref='need' className='secondDiv animated slideInRight'>
        <ContentTitle
          title={(state && state.title) || ""}
          txt={<div style={{ fontSize: 20 }}>{state.h3}</div>}
          btn={
            <div>
              <Button type='primary'>批量导入</Button>
              <Button type='primary' className='ml20'>
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
          loading={loading}
          scroll={scroll}
          dataSource={lists}
          size='middle'
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

export default ManageScore;
