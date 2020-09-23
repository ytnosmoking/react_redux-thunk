import { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {
        x: 2000,
        y: 0
      },
      search_params: {}
    }
  }
}

class Params extends State {
  fixedParams = (params = {}) => {
    params = { ...this.state.search_params, ...params }
    Object.keys(params).forEach(key => {
      if (!params[key]) {
        delete params[key];
      }
    });
    return params;
  };
  resetParams = (params = {}) => {
    params = { ...this.state.search_params, ...params }
    Object.keys(params).forEach(key => {
      params[key] = null;
    });
    return params;
  };
}

class Btns extends Params {
  confirm = () => {
    console.log(this)
    const params = this.fixedParams();
    this.getList({ ...params, page: 1 });
  };
  reset = () => {
    this.setState(
      {
        search_params: this.resetParams()
      },
      () => {
        this.confirm();
      }
    );
  };
}

export const HomeState = class extends Btns { }

