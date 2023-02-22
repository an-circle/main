import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

export default (props) => {
  const { current } = props ?? {};
  return (
    <Paragraph
      ellipsis={{ rows: 2, expandable: true, symbol: "更多" }}
      copyable
    >
      {current}
    </Paragraph>
  );
};
