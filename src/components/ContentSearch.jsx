import React, { Component } from "react";
import { DatePicker, Button } from "antd";
import moment from "moment";

class ContentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      openYear: false
    };
  }
  // year
  openChangeYear = status => {
    console.log(status);
    if (status) {
      this.setState({ openYear: true });
    } else {
      this.setState({ openYear: false });
    }
  };
  changeYear = v => {
    this.setState({
      year: v,
      openYear: false
    });
  };
  clearYear = () => {
    this.setState({
      year: null
    });
  };
  //  确定
  confirm = () => {
    this.props.confirm(moment(this.state.year).format("YYYY"));
  };
  //  clear all 重置
  clearAll = () => {
    this.setState({
      year: null,
      openYear: false
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="content-search">
        <DatePicker
          allowClear
          value={this.state.year}
          open={this.state.openYear}
          mode="year"
          placeholder="请选择年份"
          format="YYYY"
          onOpenChange={this.openChangeYear}
          onPanelChange={this.changeYear}
          onChange={this.clearYear}
        ></DatePicker>
        <Button className="ml20" type="primary" onClick={this.confirm}>
          确认
        </Button>
        <Button className="ml20" type="primary" onClick={this.clearAll}>
          重置
        </Button>
      </div>
    );
  }
}

export default ContentSearch;
