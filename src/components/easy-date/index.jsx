import React from "react";
import moment from "moment";

export default (props) => {
  const { current } = props;
  const timeMs = current * 1000;
  return <>{moment(timeMs).format("YYYY-MM-DD HH:mm:ss")}</>;
};
