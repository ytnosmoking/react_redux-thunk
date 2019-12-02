// @flow
import * as React from "react";
import { Button, Switch } from "antd";

const BaseHead = props => {
  const { toggle, exitSys, isChecked } = props;
  return (
    <div className="header">
      <Switch
        checkedChildren="开"
        unCheckedChildren="关"
        defaultChecked={isChecked}
        onChange={() => toggle()}
        className="switch"
      />
      <h1 className="school-name">武汉理工大学预期学习结果</h1>
      <Button type="primary" onClick={() => exitSys()}>
        THIS IS LOGOUT DASHBOARD
      </Button>
    </div>
  );
};

export default BaseHead;
