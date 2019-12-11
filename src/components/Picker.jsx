import React, { Component } from "react";

import { DatePicker } from "antd";
import moment from "moment";

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  openPanel = status => {
    console.log(status);
    this.setState({ open: !!status });
  };
  change = v => {
    const { key } = this.props.config;
    this.setState({ open: false }, () => {
      this.props.setParams(key, v ? moment(v).format("YYYY") : null);
    });
  };
  clear = () => {
    const { key } = this.props.config;
    this.props.setParams(key, null);
  };
  render() {
    const {
      config: { value },
      mode,
      placeholder,
      format
    } = this.props;
    return (
      <DatePicker
        allowClear
        value={value ? moment(value) : null}
        open={this.state.open}
        mode={mode}
        placeholder={placeholder}
        format={format}
        onOpenChange={this.openPanel}
        onPanelChange={this.change}
        onChange={this.clear}
      />
    );
  }
}

export default Picker;
