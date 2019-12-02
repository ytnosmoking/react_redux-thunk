import React from "react";
import { Spin, Icon } from "antd";

import Loadable from "react-loadable";

const antIcon = <Icon type="loading" spin></Icon>;
const loading = () => (
  <Spin
    indicator={antIcon}
    size="large"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  ></Spin>
);

export default name => {
  console.log(name);
  return Loadable({
    loader: () => import(`views/${name}`),
    loading,
    delay: 300
  });
};

export const LoadComponent = name => {
  return Loadable({
    loader: () => import(`component/${name}`),
    loading,
    delay: 300
  });
};
