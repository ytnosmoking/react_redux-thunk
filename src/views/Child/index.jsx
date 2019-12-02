import React, { Component } from "react";
import { Button } from "antd";
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goTo = () => {
    this.props.history.push({ pathname: "/home" });
  };
  render() {
    console.log(this);
    console.log(`%c--------------THIS IS CHILD--------------`, "color:red");
    return (
      <div style={{ backgroundColor: "lightblue" }}>
        this is Child
        <hr />
        <Button type="danger" onClick={this.goTo}>
          GO TO HOME
        </Button>
      </div>
    );
  }
}

export default Child;
