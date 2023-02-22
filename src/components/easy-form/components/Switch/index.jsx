import React from "react";
import { Switch } from "antd";
export default (props) => {
  const handleChange = (value) => {
    const res = value ? 1 : 0;
    props?.onChange(res);
  };

  return (
    <Switch {...props} checked={props?.value} onChange={handleChange}></Switch>
  );
};
