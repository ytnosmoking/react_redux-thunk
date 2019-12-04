import React from 'react';


export const BaseState = class BaseState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: {
        x: 2000,
        y: 0
      },
      serach_params: {}
    };
  }
  confirm = params => {
    console.log(params);
    Object.keys(params).forEach(key => {
      if (!params[key]) {
        delete params[key];
      }
    });
    this.setState({ serach_params: params }, () => {
      this.getList({ ...this.state.serach_params, page: 1 });
    });
  };
  setParams = params => {
    this.setState({
      serach_params: {
        ...this.state.serach_params,
        ...params
      }
    });
  };
  changePage = page => {
    console.log(page);
    const params = {
      ...this.state.serach_params,
      page
    };
    this.getList(params);
  };
  changePageSize = (page, page_size) => {
    const params = {
      ...this.state.serach_params,
      page,
      page_size
    };
    this.getList(params);
  };
}
