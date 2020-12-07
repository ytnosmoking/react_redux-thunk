import React from 'react';
import { Button } from 'antd';

import { observer } from 'mobx-react';
import store from 'store/mobx';

@observer
class MobxCom1 extends React.Component {
  // onAdd=() => {
  //   console.log(this)
  //   this.props.info.add()
  // }
  onAdd = () => {
    this.props.info.add();
  };
  onDel() {
    // store.del()
    this.props.info.del();
  }
  render() {
    console.log(this.props);
    // const { info } = this.props
    return (
      <div>
        <span>{this.props.info.num} ---mobx11111</span>
        <hr />

        <Button onClick={this.onAdd}>+++</Button>
        <hr />
        <Button onClick={this.onDel.bind(this)}>---</Button>
      </div>
    );
  }
}

@observer
class MobxModule2 extends React.Component {
  render() {
    return (
      <div>
        <span>{store.num}--mobx2</span>
        <hr />

        <Button
          onClick={() => {
            store.add();
          }}
        >
          +++
        </Button>
        <hr />
        <Button onClick={() => store.del()}>--</Button>
      </div>
    );
  }
}

class MobxModule extends React.Component {
  render() {
    return (
      <div>
        <MobxCom1 info={store} />
        <MobxModule2/>
      </div>
    );
  }
}

// export default <CountView />

export default MobxModule;
