import React, { Component } from "react";
import ContentTitle from "component/ContentTitle";
import ContentSearch from "component/ContentSearch";

class HomeNeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  confirm = obj => {
    console.log(obj);
  };
  render() {
    console.log(this);
    return (
      <div>
        <ContentTitle title={this.props.location.state.title} txt="123" />
        <ContentSearch confirm={this.confirm} />
        this is Home Index
      </div>
    );
  }
}

export default HomeNeed;
