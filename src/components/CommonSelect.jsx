import React from "react";
import { Select, Button, Divider } from "antd";
const { Option } = Select;

function CommonSelect({
  options = [],
  getMore = null,
  placeholder = "专业",
  classList = "",
  selectValue = "",
  styleObj = {
    marginLeft: "20px"
  },
  changeOption = null
}) {
  return (
    <Select
      placeholder={placeholder}
      style={styleObj}
      className={`w160 ${classList}`}
      value={selectValue || placeholder}
      dropdownRender={menu => (
        <div style={{ padding: "10px 10px 0" }}>
          {menu}
          <Divider style={{ margin: "10px 0" }} />
          <Button
            type="primary"
            size="small"
            style={{ width: "100%", marginBottom: "10px" }}
            value="more"
            onMouseDown={e => e.preventDefault()}
            onClick={getMore}
          >
            更多
          </Button>
        </div>
      )}
      onChange={changeOption}
    >
      {options.map((option, index) => (
        <Option value={option.value} label={option.label} key={index}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
}

export default CommonSelect;
