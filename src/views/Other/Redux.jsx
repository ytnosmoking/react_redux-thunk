import React, { Component } from 'react';
import { Button } from "antd";
import { connect } from 'react-redux'

const asynccrease = (type) => {
  return async(dispatch) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
    dispatch({ type })
  }
}

@connect(
  state => ({ test: state.recordtest }),
  {
    increase: () => ({ type: 'increase' }),
    decrease: () => ({ type: 'decrease' }),
    asyncincrease: asynccrease
  }
)
class Redux extends Component {
  render() {
    console.log(this.props.test)
    return <div>

      <p>{this.props.test.num}</p>

      <Button onClick={this.props.increase}>asyncincrease+10</Button>
      <br/>
      <Button onClick={this.props.decrease}>-</Button>

      <div>asynccrease</div>
      <Button onClick={() => this.props.asyncincrease('increase')}>asynccrease++</Button>
      <br/>
      <Button onClick={() => this.props.asyncincrease('decrease')}>asynccrease--</Button>
    </div>
  }
}

export default Redux
