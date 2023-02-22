import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

export default (props) => {
  const handleChange = (value) => {
    let date = null;
    if (value) {
      const date1 = moment(value[0]).valueOf();
      const date2 = moment(value[1]).valueOf();
      date = [date1, date2];
    }
    props?.onChange(date);
  };

  return (
    <RangePicker
      {...props}
      value={
        props.value?.length == 2
          ? [moment(props.value[0]), moment(props.value[1])]
          : undefined
      }
      onChange={handleChange}
    ></RangePicker>
  );
};
