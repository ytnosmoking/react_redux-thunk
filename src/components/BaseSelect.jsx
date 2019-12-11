import React, { Component } from "react";
import { Select, Button, Divider } from "antd";
const { Option } = Select;

class BaseSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get disabled() {
    return this.props.disabled || false;
  }
  get placeholder() {
    return this.props.placeholder || "专业";
  }
  get style() {
    return this.props.style || { marginLeft: "20px" };
  }
  get classList() {
    return "w160 " + (this.props.classList || "");
  }
  get options() {
    return this.props.options || [];
  }
  get getValue() {
    return this.props.getValue || this.placeholder;
  }
  get isMore() {
    return this.props.isMore;
  }
  get key() {
    return this.props.config.key || "";
  }
  get value() {
    return this.props.config.value || this.placeholder || null;
  }
  get listKey() {
    return this.props.config.listKey || "";
  }
  get listType() {
    return this.props.config.listType || "";
  }
  changeOption = value => {
    this.props.setParams(this.key, value);
  };
  getMoreList = () => {
    this.props.getMore(this.listKey, this.listType);
  };

  render() {
    const {
      disabled,
      placeholder,
      style,
      classList,
      value,
      isMore,
      options,
      getMoreList
    } = this;
    return (
      <Select
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        className={classList}
        value={value}
        dropdownRender={menu => (
          <div style={{ padding: "10px 10px 0" }}>
            {menu}

            {isMore ? (
              ""
            ) : (
              <React.Fragment>
                <Divider style={{ margin: "10px 0" }} />
                <Button
                  type="primary"
                  size="small"
                  style={{ width: "100%", marginBottom: "10px" }}
                  onMouseDown={e => e.preventDefault()}
                  onClick={getMoreList}
                >
                  更多
                </Button>
              </React.Fragment>
            )}
          </div>
        )}
        onChange={this.changeOption}
      >
        {options.map((option, index) => (
          <Option value={option.value} label={option.label} key={index}>
            {option.label}
          </Option>
        ))}
      </Select>
    );
  }
}

export default BaseSelect;
