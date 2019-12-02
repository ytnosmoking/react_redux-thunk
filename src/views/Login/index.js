import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Login } from 'store/async'
import './index.less'

@connect(state => ({
  isLogin: state.all.isLogin
}), {
  Login
})
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ' this is Login'
    };

  }

  goToDashboard = async () => {
    const res = await this.props.Login({ name: 1, code: 2 })
    console.log(res)
    if (res === 'ok') {
      this.goTo()
    }
  }
  goTo = () => {
    const { isLogin } = this.props
    if (isLogin) {
      this.props.history.push({
        pathname: "/",
      });
    }
  }
  componentDidMount() {
    console.log(this)
    // this.goTo()
  }

  render() {
    return (
      <div className="cont">
        {this.state.msg}
        <button onClick={this.goToDashboard}> this is go to DashBoard</button>
      </div>
    );
  }
}

export default LoginView;