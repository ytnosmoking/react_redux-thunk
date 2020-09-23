/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { Login } from 'store/async'
import './index.less'

@connect(state => ({
  isLogin: state.global.isLogin
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

  goTo = () => {
    const { isLogin } = this.props
    if (isLogin) {
      this.props.history.push({
        pathname: '/'
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const res = await this.props.Login(values)
        console.log(res)
        if (res.errcode === 0) {
          this.goTo()
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='cont'>
        <div >
          <img src='./imgs/school.png' alt='' className='logo' />
          <Form onSubmit={this.handleSubmit} className='loginForm'>

            <Form.Item>
              {getFieldDecorator('teacher_no', {
                rules: [{ required: true, message: '输入用户名' }]
              })(
                <Input
                  prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Username'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '输入密码!' }]
              })(
                <Input
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  placeholder='Password'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='loginBtn'>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginView);

export default WrappedNormalLoginForm;
