import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export default (props) => {
  const handleChange = (value) => {
    // 将moment 转换为时间戳
    const date = moment(value).valueOf();
    props?.onChange(date);
  };

  return (
    <DatePicker
      {...props}
      value={props.value ? moment(props.value) : undefined}
      onChange={handleChange}
    ></DatePicker>
  );
};
