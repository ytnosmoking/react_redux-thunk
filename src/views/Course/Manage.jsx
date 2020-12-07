import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import ContentTitle from 'component/ContentTitle';
import BasePagination from 'component/BasePagination';

import ManageOutLine from './ManageOutLine';
import ManageSet from './ManageSet';
import ManageScore from './ManageScore';

import { Table, Button } from 'antd';
import { CourseManageCols, operation } from 'utils/cols';
import { HomeState } from 'utils/extends';
import { getCourseManage as getList } from 'store/async';
const routes = [
  {
    name: 'outLine',
    txt: '查看大纲',
    component: ManageOutLine
  },
  {
    name: 'set',
    txt: '考核设置',
    component: ManageSet
  },
  {
    name: 'score',
    txt: '上传成绩',
    component: ManageScore
  }
];
const tableCols = [
  ...CourseManageCols,
  operation({
    width: 260,
    fixed: 'right',
    // eslint-disable-next-line react/display-name
    render: (txt, record) => (
      <div>
        {routes.map((route, index) => (
          <Button
            type='primary'
            size='small'
            className={index ? 'ml10' : ''}
            key={route.name}
          >
            <Link
              to={{
                pathname: `/course/manage/${record.id}/${route.name}`,
                state: {
                  id: record.id,
                  title: route.txt,
                  h3: record.term.title + '-' + record.course.title
                }
              }}
            >
              {route.txt}
            </Link>
          </Button>
        ))}
      </div>
    )
  })
];
@connect(
  (state) => ({
    ...state.course.manage
  }),
  {
    getList
  }
)
class Manage extends HomeState {
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
    this.getList();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: false
    });
  }
  getList = (params) => {
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
      <div ref='need'>
        <ContentTitle title={(state && state.title) || ''} />
        <Table
          style={{
            marginTop: 20,
            backgroundColor: '#fff',
            maxHeight: scroll.y + 'px'
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
        {routes.map((route) => (
          <Route
            key={route.name}
            path={`${this.props.match.path}/:id/${route.name}`}
            component={route.component}
          ></Route>
        ))}
      </div>
    );
  }
}

export default Manage;
