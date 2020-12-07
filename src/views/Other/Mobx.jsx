import React from 'react';
import { Button } from 'antd';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

class Score {
  constructor() {
    makeAutoObservable(this);
  }
  count = 0;
  setCount = (val = 0) => {
    this.count = val;
  };
}
const scoreCounts = new Score();

const CountView = observer(({ count }) => {
  return (
    <>
      <h3> {count.count}</h3>
      <Button onClick={() => count.setCount(count.count + 1)}>++++</Button>
      <Button onClick={() => count.setCount(count.count - 1)}>----</Button>
    </>
  );
});

const ProxyView1 = ({ tar, Add, Del }) => {
  console.log(tar);
  return (
    <>
      <h3> {tar.num}</h3>
      <Button type='primary' onClick={Add}>++++</Button>
      <Button type='danger' onClick={Del}>----</Button>
    </>
  );
};
class MobxCom extends React.Component {
  constructor() {
    super();
    this.state = {
      local: { num: 0 }

    }
  }

  render() {
    const local = Object.assign({}, this.state.local)
    return (
      <div>
        <h3> this is Mobx Learning</h3>

        <hr />
        <h5> mobx Store</h5>
        <CountView count={scoreCounts} />
        <br />
        <hr />
        <h5> setState </h5>
        <ProxyView1
          tar={local}
          Add={() => {
            console.log(1)
            console.log(this.state.local)
            this.setState({
              local: {
                num: local.num + 1
              }
            })
            // this.local.num = this.local.num + 1;
          }}
          Del={() => {
            console.log(2)
            this.setState({
              local: {
                num: local.num - 1
              }
            })
            console.log(this.state.local)
            // this.local.num = this.local.num - 1;
          }}
        />
        {/* <div>{tar.num}</div>
      <Button onClick={() => ++tar.num}>++++</Button>
      <Button onClick={() => --tar.num}>----</Button> */}
      </div>
    );
  }
}

// export default <CountView />

export default MobxCom;
