import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import style from "./index.less";

export default (props) => {
  const { label, value, onClose } = props;

  return (
    <div className={style.record}>
      <span>
        {label}:{value}
      </span>
      <span className={style.x} onClick={onClose}>
        <CloseOutlined />
      </span>
    </div>
  );
};
