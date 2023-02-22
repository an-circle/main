import React from "react";
import { Drawer, Space, Button } from "antd";

export default (props) => {
  const { open, onClose, onConfirm, width = 600, ...rest } = props;

  return (
    <>
      <Drawer
        title={props?.title}
        placement="right"
        onClose={onClose}
        visible={open}
        width={width}
        {...rest}
      >
        {props?.children}
        <div style={{ position: "fixed", right: 24, bottom: 24 }}>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onConfirm}>
              确定
            </Button>
          </Space>
        </div>
      </Drawer>
    </>
  );
};
