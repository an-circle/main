import React from "react";

export default (props) => {
  return <div>{props?.current || "-"}</div>;
};
